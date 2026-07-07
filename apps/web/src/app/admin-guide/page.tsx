import type { Metadata } from "next";
import { KeyRound, LayoutList, ImagePlus, FileEdit, Clock, ShieldAlert } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/Container";
import { Breadcrumb } from "@/components/Breadcrumb";
import { HighlightLine } from "@/components/HighlightLine";

export const metadata: Metadata = {
  title: "Личный кабинет — инструкция",
  description: "Как заходить и работать в личном кабинете karaokeshop.",
  robots: { index: false, follow: false },
};

const sections: { icon?: LucideIcon; title: string; body: string[] }[] = [
  {
    icon: LayoutList,
    title: "Что где (разделы слева)",
    body: [
      "Товары — каталог: название, цена, скидка, тип, фото, «в наличии», описание, комплектация.",
      "Контакты и сайт — телефон, WhatsApp, адрес, почта, часы работы, заголовки/описания страниц (SEO).",
      "Блог — статьи: заголовок, текст, вопросы-ответы.",
      "Истории и кейсы — отзывы-истории установок, кейсы объектов.",
      "Лендинги и бренды — заголовки и описания страниц «для дома / для бизнеса / бренды» и т.п.",
    ],
  },
  {
    icon: FileEdit,
    title: "Как поменять цену товара (пример)",
    body: [
      "Слева нажмите «Товары».",
      "Выберите товар в списке (например, «AST-250»).",
      "Найдите поле «Цена», впишите новое число (только цифры, без пробелов и «₸»).",
      "Нажмите «Сохранить» (Save) вверху справа.",
      "Через 1–2 минуты новая цена уже на сайте.",
      "Так же меняются любые поля: название, «в наличии» (галочка), скидка, описание.",
    ],
  },
  {
    icon: ImagePlus,
    title: "Как загрузить фото товара",
    body: [
      "Откройте товар → поле «Фото».",
      "Нажмите «Выбрать изображение» → «Загрузить» и выберите файл с компьютера.",
      "Сохраните. Фото появится на карточке товара и на его странице.",
      "Лучше квадратное или горизонтальное фото, чёткое, на однотонном фоне. Слишком тяжёлые файлы (больше ~2 МБ) перед загрузкой лучше сжать.",
    ],
  },
  {
    icon: FileEdit,
    title: "Как добавить статью в блог",
    body: [
      "Раздел «Блог» → «Создать запись» (New).",
      "Заполните: заголовок, короткое описание (для превью), текст (по абзацам), при желании — вопросы-ответы.",
      "Сохраните. Новая статья появится в разделе «Блог» на сайте.",
    ],
  },
  {
    icon: Clock,
    title: "Что происходит после «Сохранить»",
    body: [
      "Кабинет сохраняет правку в GitHub (там хранится весь сайт), и сайт автоматически пересобирается. Ждать ~1–2 минуты — потом обновите страницу сайта, изменения будут видны.",
      "Каждая правка сохраняется в историю — если что-то пошло не так, прежнюю версию всегда можно вернуть.",
      "Сломать сайт формами почти невозможно — цена принимает только числа, обязательные поля нельзя оставить пустыми.",
    ],
  },
  {
    icon: ShieldAlert,
    title: "Чего не стоит делать",
    body: [
      "Не оставляйте обязательные поля (название, цена) пустыми.",
      "Не вставляйте в цену буквы, пробелы, «₸» — только число.",
      "Не удаляйте товар, если не уверены — лучше снимите галочку «в наличии».",
    ],
  },
  {
    title: "Если правка не появилась",
    body: [
      "Прошло меньше 2 минут — просто подождите и обновите страницу (Ctrl/Cmd + R).",
      "Прошло больше 5 минут — возможно, сборка сайта не прошла. Напишите тому, кто ведёт сайт: он проверит.",
    ],
  },
];

export default function Page() {
  return (
    <Container className="py-10">
      <Breadcrumb items={[{ label: "Инструкция кабинета" }]} />

      <h1 className="font-display text-3xl font-bold leading-tight">
        Личный <HighlightLine>кабинет</HighlightLine> — инструкция
      </h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Личный кабинет — это визуальный редактор сайта. Вы меняете товары, цены, тексты, фото и статьи через
        удобные формы, без кода. После сохранения сайт сам обновляется за 1–2 минуты.
      </p>

      <a
        href="/admin/"
        className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-cta px-5 py-3 text-sm font-medium text-cta-fg transition-opacity hover:opacity-90"
      >
        Открыть кабинет
      </a>

      {/* Как зайти */}
      <section className="mt-10 rounded-xl border border-border bg-background p-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
            <KeyRound className="h-5 w-5" />
          </span>
          <h2 className="font-display text-xl font-semibold">Как зайти</h2>
        </div>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-muted-foreground marker:text-foreground">
          <li>
            Откройте на сайте адрес <code className="rounded-sm border border-border bg-surface px-1.5 py-0.5 text-foreground">/admin/</code>.
          </li>
          <li>
            На экране входа нажмите <span className="font-medium text-foreground">«Sign In Using Access Token»</span> (вход по токену).
          </li>
          <li>
            Sveltia откроет страницу генерации токена на GitHub — там нужно создать{" "}
            <span className="font-medium text-foreground">fine-grained personal access token</span>: в разделе
            «Repository access» выбрать только репозиторий{" "}
            <code className="rounded-sm border border-border bg-surface px-1.5 py-0.5 text-foreground">airginggger-collab/Karaokeshop</code>,
            в «Permissions» выставить <span className="font-medium text-foreground">Contents: Read and write</span>.
            Срок действия токена — на ваше усмотрение (можно на год).
          </li>
          <li>Скопируйте токен и вставьте его в поле входа на сайте.</li>
          <li>
            Готово — откроется кабинет со списком разделов слева. Токен сохранится в браузере: вводить его
            повторно нужно только при смене браузера или устройства.
          </li>
        </ol>
        <p className="mt-4 rounded-lg bg-surface p-3 text-xs text-muted-foreground">
          Токен — это и есть ваш ключ к сайту. Никому его не передавайте. Если понадобится отозвать доступ —
          удалите токен в настройках своего GitHub-аккаунта.
        </p>
      </section>

      {/* Остальные секции */}
      <div className="mt-6 space-y-6">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <section key={s.title} className="rounded-xl border border-border bg-background p-6">
              <div className="flex items-center gap-3">
                {Icon && (
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                )}
                <h2 className="font-display text-xl font-semibold">{s.title}</h2>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {s.body.map((line, i) => (
                  <li key={i} className="leading-6">
                    {line}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <div className="mt-10 rounded-xl bg-surface p-6 text-center">
        <p className="font-medium">Готовы внести правку?</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Кабинет открывается прямо в браузере — код трогать не нужно.
        </p>
        <a
          href="/admin/"
          className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-cta px-5 py-3 text-sm font-medium text-cta-fg transition-opacity hover:opacity-90"
        >
          Открыть кабинет
        </a>
      </div>
    </Container>
  );
}
