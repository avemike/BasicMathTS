import { ExpressionNode } from "../lib/models/expression";
import { evaluate } from "../lib/evaluate";

describe("Evaluate", () => {
  test("Simple addition", () => {
    const tree = new ExpressionNode(
      "+",
      new ExpressionNode("3"),
      new ExpressionNode("5")
    );
    expect(evaluate(tree)).toBe(8);
  });

  test("Simple subtraction", () => {
    const tree = new ExpressionNode(
      "-",
      new ExpressionNode("10"),
      new ExpressionNode("2")
    );
    expect(evaluate(tree)).toBe(8);
  });

  test("Simple multiplication", () => {
    const tree = new ExpressionNode(
      "*",
      new ExpressionNode("4"),
      new ExpressionNode("7")
    );
    expect(evaluate(tree)).toBe(28);
  });

  test("Simple division", () => {
    const tree = new ExpressionNode(
      "/",
      new ExpressionNode("9"),
      new ExpressionNode("3")
    );
    expect(evaluate(tree)).toBe(3);
  });

  test("Simple modulo", () => {
    const tree = new ExpressionNode(
      "%",
      new ExpressionNode("10"),
      new ExpressionNode("3")
    );
    expect(evaluate(tree)).toBe(1);
  });

  test("Simple power", () => {
    const tree = new ExpressionNode(
      "^",
      new ExpressionNode("2"),
      new ExpressionNode("3")
    );
    expect(evaluate(tree)).toBe(8);
  });

  test("Complex expression", () => {
    const tree = new ExpressionNode(
      "+",
      new ExpressionNode("3"),
      new ExpressionNode(
        "/",
        new ExpressionNode(
          "*",
          new ExpressionNode("5"),
          new ExpressionNode(
            "-",
            new ExpressionNode("10"),
            new ExpressionNode("4")
          )
        ),
        new ExpressionNode("2")
      )
    );

    expect(evaluate(tree)).toBe(18);
  });

  test("Complex expression with modulo", () => {
    const tree = new ExpressionNode(
      "+",
      new ExpressionNode("3"),
      new ExpressionNode(
        "%",
        new ExpressionNode(
          "/",
          new ExpressionNode(
            "*",
            new ExpressionNode("5"),
            new ExpressionNode(
              "-",
              new ExpressionNode("10"),
              new ExpressionNode("4")
            )
          ),
          new ExpressionNode("2")
        ),
        new ExpressionNode("3")
      )
    );

    expect(evaluate(tree)).toBe(3);
  });

  test("Expression with whitespace", () => {
    const tree = new ExpressionNode(
      "+",
      new ExpressionNode("3"),
      new ExpressionNode(
        "/",
        new ExpressionNode(
          "*",
          new ExpressionNode("4"),
          new ExpressionNode("2")
        ),
        new ExpressionNode(
          "-",
          new ExpressionNode("1"),
          new ExpressionNode("5")
        )
      )
    );

    expect(evaluate(tree)).toBe(1);
  });

  test("Complex expression with power", () => {
    const tree = new ExpressionNode(
      "+",
      new ExpressionNode("3"),
      new ExpressionNode(
        "^",
        new ExpressionNode(
          "/",
          new ExpressionNode(
            "*",
            new ExpressionNode("5"),
            new ExpressionNode(
              "-",
              new ExpressionNode("10"),
              new ExpressionNode("4")
            )
          ),
          new ExpressionNode("2")
        ),
        new ExpressionNode("2")
      )
    );

    expect(evaluate(tree)).toBe(228);
  });

  test("Division by zero", () => {
    const tree = new ExpressionNode(
      "/",
      new ExpressionNode("10"),
      new ExpressionNode("0")
    );
    expect(() => evaluate(tree)).toThrow("Division by zero");
  });

  test("Unknown operator", () => {
    const tree = new ExpressionNode(
      "@" as any,
      new ExpressionNode("10"),
      new ExpressionNode("2")
    );
    expect(() => evaluate(tree)).toThrow("Unknown operator: @");
  });
});
