import { calculate } from "../lib/calculate";

describe("Calculate Integration Tests", () => {
  test("Simple addition", () => {
    const expression = "3 + 5";
    const result = calculate(expression);

    expect(result).toBe(8);
  });

  test("Complex expression", () => {
    const expression = "3 + 5 * (10 - 4) / 2";
    const result = calculate(expression);

    expect(result).toBe(18);
  });

  test("Expression with whitespace", () => {
    const expression = " 3 +   4 * 2 / ( 1 - 5 ) ";
    const result = calculate(expression);

    expect(result).toBe(1);
  });

  test("Expression with decimals", () => {
    const expression = "3.5 + 2.5";
    const result = calculate(expression);

    expect(result).toBe(6);
  });

  test("Division by zero", () => {
    const expression = "10 / 0";

    expect(() => calculate(expression)).toThrow("Division by zero");
  });
});
