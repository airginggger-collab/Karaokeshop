import { Ruler, Wrench, SlidersHorizontal, Users, RefreshCw } from "lucide-react";

const steps = [
  { icon: Ruler, label: "Проект звука" },
  { icon: Wrench, label: "Монтаж" },
  { icon: SlidersHorizontal, label: "Настройка" },
  { icon: Users, label: "Обучение" },
  { icon: RefreshCw, label: "Обновление песен" },
];

export function ServiceSteps() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
      {steps.map(({ icon: Icon, label }, i) => (
        <div key={label} className="rounded-lg bg-surface px-3 py-3">
          <p className="text-xs text-muted-foreground">0{i + 1}</p>
          <Icon className="mt-1 h-4 w-4 text-primary" />
          <p className="mt-1 text-sm">{label}</p>
        </div>
      ))}
    </div>
  );
}
