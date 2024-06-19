import { ValuesOf } from "./utils/types";

export const TOKEN_TYPE = {
  number: "number",
  operator: "operator",
  parenthesis: "parenthesis",
} as const;
export type TokenType = ValuesOf<typeof TOKEN_TYPE>;

export class Token {
  type: TokenType;
  value: string;

  constructor(type: TokenType, value: string) {
    this.type = type;
    this.value = value;
  }
}
