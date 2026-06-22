const clients = [
  { name: "Ресторан Шафран", city: "Алматы" },
  { name: "Бар Nomad", city: "Алматы" },
  { name: "Клуб Babylon", city: "Алматы" },
  { name: "Отель Достык", city: "Алматы" },
  { name: "Кафе Орхидея", city: "Алматы" },
  { name: "Ресторан Думан", city: "Астана" },
  { name: "Клуб Expo", city: "Астана" },
  { name: "Банкет-холл Байтерек", city: "Астана" },
];

export function ClientLogos() {
  return (
    <section className="mt-12">
      <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Нам доверяют заведения Алматы и Астаны
      </p>
      <div className="mt-5 flex flex-wrap justify-center gap-3">
        {clients.map((c) => (
          <div
            key={c.name}
            className="rounded-xl border border-border bg-background px-4 py-2.5 text-center"
          >
            <p className="text-sm font-medium leading-tight">{c.name}</p>
            <p className="text-[11px] text-muted-foreground">{c.city}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
