import { calculate } from "../lib/calculate";

describe("Calculate", () => {
  test("Simple addition", () => {
    const expression = "3 + 5";
    const result = calculate(expression);

    expect(result).toBe(eval(expression));
  });

  test("Complex expression", () => {
    const expression = "3 + 5 * (10 - 4) / 2";
    const result = calculate(expression);

    expect(result).toBe(18);
  });

  test("Complex expression with modulo", () => {
    const expression = "3 + 5 * (10 - 4) / 2 % 3";
    const result = calculate(expression);

    expect(result).toBe(eval(expression));
  });

  test("Expression with whitespace", () => {
    const expression = " 3 +   4 * 2 / ( 1 - 5 ) ";
    const result = calculate(expression);

    expect(result).toBe(eval(expression));
  });

  test("Expression with decimals", () => {
    const expression = "3.5 + 2.5";
    const result = calculate(expression);

    expect(result).toBe(eval(expression));
  });

  test("Division by zero", () => {
    const expression = "10 / 0";

    expect(() => calculate(expression)).toThrow("Division by zero");
  });
});
