import { Operators } from "./models/operators";
import { Token, TOKEN_TYPE } from "./models/token";

const WHITESPACE_REGEXR = /\s/;
const NUMBER_REGEXR = /\d/;
const NUMBER_OR_DOT_REGEXR = /\d|\./;
// @todo: create OPERATOR_REGEXR based on the OPERATORS const
const OPERATOR_REGEXR = /[+\-*/%^]/;
const PARENTHESIS_REGEXR = /[()]/;

export function tokenize(expression: string): Token[] {
  const tokens: Token[] = [];

  let current = 0;
  while (current < expression.length) {
    let char = expression[current];

    // Check for whitespace and skip it
    if (WHITESPACE_REGEXR.test(char)) {
      current++;
      continue;
    }

    // Check for numbers
    if (NUMBER_REGEXR.test(char)) {
      let number = "";
      let hasDecimalPoint = false;

      // Handle decimal numbers
      while (NUMBER_OR_DOT_REGEXR.test(char)) {
        if (char === ".") {
          if (hasDecimalPoint) {
            throw new Error(
              `Unexpected character: ${char} at position ${current}`
            );
          }

          hasDecimalPoint = true;
        }

        number += char;
        char = expression[++current];
      }

      tokens.push(new Token(TOKEN_TYPE.number, number));
      continue;
    }

    // Check for operators
    if (OPERATOR_REGEXR.test(char)) {
      tokens.push(new Token(TOKEN_TYPE.operator, char as Operators));
      current++;
      continue;
    }

    // Check for parentheses
    if (PARENTHESIS_REGEXR.test(char)) {
      tokens.push(new Token(TOKEN_TYPE.parenthesis, char));
      current++;
      continue;
    }

    throw new Error(`Unexpected character: ${char} at position ${current}`);
  }

  return tokens;
}
