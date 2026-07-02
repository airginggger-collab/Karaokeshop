import { describe, it, expect } from "vitest";
import { parseValue } from "./CountUp";

describe("parseValue", () => {
  it("число с разделителем-пробелом и суффиксом +", () => {
    expect(parseValue("60 000+")).toEqual({ prefix: "", target: 60000, suffix: "+" });
  });
  it("простое число с суффиксом +", () => {
    expect(parseValue("14+")).toEqual({ prefix: "", target: 14, suffix: "+" });
  });
  it("число со словесным суффиксом (пробел сохраняется)", () => {
    expect(parseValue("2 года")).toEqual({ prefix: "", target: 2, suffix: " года" });
  });
  it("префикс + число + суффикс", () => {
    expect(parseValue("от 749 000 ₸")).toEqual({ prefix: "от ", target: 749000, suffix: " ₸" });
  });
  it("нет числа → null", () => {
    expect(parseValue("Без ограничений")).toBeNull();
  });
});
