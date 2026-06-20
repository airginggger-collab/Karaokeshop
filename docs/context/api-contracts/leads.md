# API-контракт: лиды (заявки)

> Описывает как клиентская заявка доходит до менеджера — сейчас и в плане.

---

## Текущая реализация (Фаза 1, статика)

Никакого API-эндпоинта нет. Заявка формируется на клиенте как текстовая строка и открывается в WhatsApp.

### Точки входа

| Компонент | Путь | Триггер |
|---|---|---|
| `AreaCalculator` | `/pod-klyuch` | кнопка «Получить смету» |
| `CalculatorClient` | `/kalkulyator` | кнопка «Отправить в WhatsApp» |
| `kontakty/page.tsx` | `/kontakty` | ссылка «Написать в WhatsApp» |

### Формат сообщения (AreaCalculator)

```
Здравствуйте! Хочу узнать стоимость для зала {area} м².
```

### Формат сообщения (CalculatorClient — смета)

```
Добрый день! Прошу выставить счёт на оборудование:

[список позиций из сметы]

Итого: {total} ₸
Площадь: {area} м² | Тип: {venue}
```

### WhatsApp URL

```
https://wa.me/77075799995?text=<encodeURIComponent(text)>
```

Номер берётся из `siteConfig.whatsapp` (`apps/web/src/lib/site.ts`).

---

## Плановая реализация (Фаза 3+)

Когда добавим серверную обработку (Next.js Route Handler или edge function):

### POST /api/leads

```json
{
  "name": "string",
  "phone": "+7XXXXXXXXXX",
  "venueType": "dom | kafe | bar | klub | otel",
  "area": 80,
  "recommendedKit": "AST-250 + акустика The Box CL",
  "source": "pod_klyuch | product | bundle | calculator | home",
  "message": "string (опц.)"
}
```

**Ответ 200:**
```json
{ "ok": true, "leadId": "uuid" }
```

**Ответ 422:**
```json
{ "ok": false, "error": "phone required" }
```

### Что происходит на сервере

1. Валидация (phone, venueType обязательны).
2. Уведомление менеджеру: email (Resend/Sendgrid) + WhatsApp (Wati/Twilio).
3. Запись в CRM или Notion-базу (TBD).

### Переменные окружения (Фаза 3)

```
LEAD_EMAIL_TO=karaokeshop2015@gmail.com
RESEND_API_KEY=...
```

---

## Примечание по статической архитектуре

Пока сайт `output: "export"` (чистая статика) — Route Handlers недоступны. Серверная обработка лидов потребует либо:
- перехода на `@opennextjs/cloudflare` (вариант B, ADR-0002), или
- внешнего сервиса (Formspree, Netlify Forms, Make.com webhook).
