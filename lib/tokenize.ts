import { Token, TOKEN_TYPE } from "./token";

export function tokenize(expression: string): Token[] {
  const tokens: Token[] = [];

  let current = 0;
  while (current < expression.length) {
    let char = expression[current];

    // Check for whitespace and skip it
    if (/\s/.test(char)) {
      current++;
      continue;
    }

    // Check for numbers
    if (/\d/.test(char)) {
      let number = "";

      // Handle decimal numbers
      while (/\d|\./.test(char)) {
        number += char;
        char = expression[++current];
      }

      tokens.push(new Token(TOKEN_TYPE.number, number));
      continue;
    }

    // Check for operators
    if (/[+\-*/]/.test(char)) {
      tokens.push(new Token(TOKEN_TYPE.operator, char));
      current++;
      continue;
    }

    // Check for parentheses
    if (/[()]/.test(char)) {
      tokens.push(new Token(TOKEN_TYPE.parenthesis, char));
      current++;
      continue;
    }

    throw new Error(`Unexpected character: ${char}`);
  }

  return tokens;
}
