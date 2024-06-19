import { Token, TOKEN_TYPE } from "../lib/token";
import { tokenize } from "../lib/tokenize";

describe("Tokenize Function", () => {
  const assertTokensEqual = (actual: Token[], expected: Token[]) => {
    expect(actual.length).toBe(expected.length);
    for (let i = 0; i < actual.length; i++) {
      expect(actual[i].type).toBe(expected[i].type);
      expect(actual[i].value).toBe(expected[i].value);
    }
  };

  test("Basic arithmetic - addition", () => {
    assertTokensEqual(tokenize("3 + 5"), [
      new Token(TOKEN_TYPE.number, "3"),
      new Token(TOKEN_TYPE.operator, "+"),
      new Token(TOKEN_TYPE.number, "5"),
    ]);
  });

  test("Basic arithmetic - subtraction", () => {
    assertTokensEqual(tokenize("10 - 2"), [
      new Token(TOKEN_TYPE.number, "10"),
      new Token(TOKEN_TYPE.operator, "-"),
      new Token(TOKEN_TYPE.number, "2"),
    ]);
  });

  test("Basic arithmetic - multiplication", () => {
    assertTokensEqual(tokenize("4 * 7"), [
      new Token(TOKEN_TYPE.number, "4"),
      new Token(TOKEN_TYPE.operator, "*"),
      new Token(TOKEN_TYPE.number, "7"),
    ]);
  });

  test("Basic arithmetic - division", () => {
    assertTokensEqual(tokenize("9 / 3"), [
      new Token(TOKEN_TYPE.number, "9"),
      new Token(TOKEN_TYPE.operator, "/"),
      new Token(TOKEN_TYPE.number, "3"),
    ]);
  });

  test("Complex expression", () => {
    assertTokensEqual(tokenize("3 + 5 * (10 - 4) / 2"), [
      new Token(TOKEN_TYPE.number, "3"),
      new Token(TOKEN_TYPE.operator, "+"),
      new Token(TOKEN_TYPE.number, "5"),
      new Token(TOKEN_TYPE.operator, "*"),
      new Token(TOKEN_TYPE.parenthesis, "("),
      new Token(TOKEN_TYPE.number, "10"),
      new Token(TOKEN_TYPE.operator, "-"),
      new Token(TOKEN_TYPE.number, "4"),
      new Token(TOKEN_TYPE.parenthesis, ")"),
      new Token(TOKEN_TYPE.operator, "/"),
      new Token(TOKEN_TYPE.number, "2"),
    ]);
  });

  test("Expression with spaces", () => {
    assertTokensEqual(tokenize(" (1+2)*3 / (4 - 5)"), [
      new Token(TOKEN_TYPE.parenthesis, "("),
      new Token(TOKEN_TYPE.number, "1"),
      new Token(TOKEN_TYPE.operator, "+"),
      new Token(TOKEN_TYPE.number, "2"),
      new Token(TOKEN_TYPE.parenthesis, ")"),
      new Token(TOKEN_TYPE.operator, "*"),
      new Token(TOKEN_TYPE.number, "3"),
      new Token(TOKEN_TYPE.operator, "/"),
      new Token(TOKEN_TYPE.parenthesis, "("),
      new Token(TOKEN_TYPE.number, "4"),
      new Token(TOKEN_TYPE.operator, "-"),
      new Token(TOKEN_TYPE.number, "5"),
      new Token(TOKEN_TYPE.parenthesis, ")"),
    ]);
  });

  test("Handling whitespace", () => {
    assertTokensEqual(tokenize("  7  +  8 "), [
      new Token(TOKEN_TYPE.number, "7"),
      new Token(TOKEN_TYPE.operator, "+"),
      new Token(TOKEN_TYPE.number, "8"),
    ]);
  });

  test("Handling tabs", () => {
    assertTokensEqual(tokenize("\t9\t*\t2\t"), [
      new Token(TOKEN_TYPE.number, "9"),
      new Token(TOKEN_TYPE.operator, "*"),
      new Token(TOKEN_TYPE.number, "2"),
    ]);
  });

  test("Decimal numbers", () => {
    assertTokensEqual(tokenize("3.14 + 2.71"), [
      new Token(TOKEN_TYPE.number, "3.14"),
      new Token(TOKEN_TYPE.operator, "+"),
      new Token(TOKEN_TYPE.number, "2.71"),
    ]);
  });

  test("More decimal numbers", () => {
    assertTokensEqual(tokenize("0.5 * 4.2"), [
      new Token(TOKEN_TYPE.number, "0.5"),
      new Token(TOKEN_TYPE.operator, "*"),
      new Token(TOKEN_TYPE.number, "4.2"),
    ]);
  });

  test("Empty input", () => {
    assertTokensEqual(tokenize(""), []);
  });

  test("Invalid character", () => {
    expect(() => tokenize("3 + @")).toThrow("Unexpected character: @");
  });

  test("Malformed number", () => {
    expect(() => tokenize("10..2 + 3")).toThrow("Unexpected character: .");
  });
});
