import { Token, TOKEN_TYPE } from "../lib/models/token";
import { parse } from "../lib/parse";
import { ExpressionNode } from "../lib/models/expression";

describe("Parse", () => {
  it("Simple expression with numbers and operators", () => {
    const tokens = [
      new Token(TOKEN_TYPE.number, "3"),
      new Token(TOKEN_TYPE.operator, "+"),
      new Token(TOKEN_TYPE.number, "4"),
    ];

    const result = parse(tokens);

    const expectedTree = new ExpressionNode(
      "+",
      new ExpressionNode("3"),
      new ExpressionNode("4")
    );

    expect(result).toEqual(expectedTree);
  });

  it("Expression with parentheses", () => {
    const tokens = [
      new Token(TOKEN_TYPE.parenthesis, "("),
      new Token(TOKEN_TYPE.number, "3"),
      new Token(TOKEN_TYPE.operator, "+"),
      new Token(TOKEN_TYPE.number, "4"),
      new Token(TOKEN_TYPE.parenthesis, ")"),
      new Token(TOKEN_TYPE.operator, "*"),
      new Token(TOKEN_TYPE.number, "2"),
    ];

    const result = parse(tokens);

    const expectedTree = new ExpressionNode(
      "*",
      new ExpressionNode("+", new ExpressionNode("3"), new ExpressionNode("4")),
      new ExpressionNode("2")
    );

    expect(result).toEqual(expectedTree);
  });

  it("Invalid operators", () => {
    const tokens = [
      new Token(TOKEN_TYPE.number, "3"),
      new Token(TOKEN_TYPE.operator, "@" as any), // Invalid operator
      new Token(TOKEN_TYPE.number, "4"),
    ];

    expect(() => parse(tokens)).toThrow("Invalid operator: @");
  });
});
