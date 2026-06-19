const groups = [
  { title: "Сценарий", options: ["Для дома", "Для кафе", "Для бара / клуба", "Отель / банкет"] },
  { title: "Бренд", options: ["AST", "Studio Evolution"] },
  { title: "Площадь", options: ["до 50 м²", "до 80 м²", "100+ м²"] },
];

export function FilterRail() {
  return (
    <aside className="text-sm">
      {groups.map((g) => (
        <div key={g.title} className="mb-5">
          <p className="mb-2 font-medium">{g.title}</p>
          {g.options.map((o) => (
            <label key={o} className="mb-1.5 flex items-center gap-2 text-muted-foreground">
              <input type="checkbox" className="h-4 w-4 rounded border-border" />
              {o}
            </label>
          ))}
        </div>
      ))}
    </aside>
  );
}
