import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("рендерит лейбл и проставляет variant", () => {
    render(<Button variant="primary">Купить</Button>);
    const btn = screen.getByRole("button", { name: "Купить" });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute("data-variant", "primary");
  });

  it("ghost-вариант имеет рамку", () => {
    render(<Button variant="ghost">Консультация</Button>);
    const btn = screen.getByRole("button", { name: "Консультация" });
    expect(btn.className).toContain("border");
  });
});
