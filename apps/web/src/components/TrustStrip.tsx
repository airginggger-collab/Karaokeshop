import { CalendarClock, ShieldCheck, Wrench, Music } from "lucide-react";
import { Container } from "./Container";

const items = [
  { icon: CalendarClock, label: "С 2012 года" },
  { icon: ShieldCheck, label: "Гарантия + сервис-центр" },
  { icon: Wrench, label: "Монтаж и настройка" },
  { icon: Music, label: "Обновление песен" },
];

export function TrustStrip() {
  return (
    <Container className="py-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2 rounded-lg bg-surface px-3 py-2.5 text-sm">
            <Icon className="h-4 w-4 text-primary" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </Container>
  );
}
