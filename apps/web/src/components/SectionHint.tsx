import { Info } from "lucide-react";

/** Подсказка-тултип у заголовка секции: пояснение всплывает при наведении и
 * при фокусе с клавиатуры (решение владельца 2026-09-10 — подзаголовки под
 * заголовками убраны, текст ушёл сюда).
 *
 * ВАЖНО: позиционный контекст создаёт **обёртка заголовка** (`relative` на
 * строке «заголовок + подсказка»), а не сам компонент. Тултип шириной 288px
 * тогда начинается от левого края заголовка, то есть от края контейнера, и
 * влезает даже на 320px. Если привязать его к иконке (`relative` здесь), на
 * телефоне он уезжает за правый край: иконка стоит в конце строки заголовка.
 * Убирать `relative` у обёртки нельзя — тултип уедет к дальнему предку.
 *
 * Компонент намеренно **без состояния и без "use client"**: показ на чистом
 * CSS (`group-hover` + `group-focus-within`), поэтому подсказка работает и в
 * статическом экспорте без гидратации. Кнопка нужна не для клика, а чтобы
 * подсказка была достижима с клавиатуры и по тапу (на телефоне hover'а нет).
 * Текст для скринридера несёт `aria-label` кнопки, а сам тултип `aria-hidden`,
 * иначе пояснение читалось бы дважды.
 *
 * `transition-[opacity,transform]` вместо `transition-all` — ловушка 17. */
export function SectionHint({ text }: { text: string }) {
  return (
    <span className="group inline-flex shrink-0 items-center">
      <button
        type="button"
        aria-label={`Подсказка: ${text}`}
        className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground"
      >
        <Info className="h-5 w-5" aria-hidden />
      </button>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-full z-30 w-72 max-w-[calc(100vw-2.5rem)] translate-y-1 rounded-xl border border-border bg-background p-3 text-sm text-muted-foreground opacity-0 shadow-lg transition-[opacity,transform] duration-150 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
      >
        {text}
      </span>
    </span>
  );
}
