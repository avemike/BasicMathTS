import { Operators } from "./operators";
import { ValuesOf } from "./utils/types";

export const TOKEN_TYPE = {
  number: "number",
  operator: "operator",
  parenthesis: "parenthesis",
} as const;
export type TokenType = ValuesOf<typeof TOKEN_TYPE>;

type TokenValueType<T extends TokenType> = T extends typeof TOKEN_TYPE.operator
  ? Operators
  : string;

export class Token<T extends TokenType = TokenType> {
  type: T;
  value: TokenValueType<T>;

  constructor(type: T, value: TokenValueType<T>) {
    this.type = type;
    this.value = value;
  }
}
