export const ADD_OPERATOR = "+";
export const SUBTRACT_OPERATOR = "-";
export const MULTIPLY_OPERATOR = "*";
export const DIVIDE_OPERATOR = "/";
export const MODULO_OPERATOR = "%";

const OPERATORS = [
  ADD_OPERATOR,
  SUBTRACT_OPERATOR,
  MULTIPLY_OPERATOR,
  DIVIDE_OPERATOR,
  MODULO_OPERATOR,
] as const;

export type Operators = (typeof OPERATORS)[number];

export const OPERATORS_PRECEDENCE: Record<Operators, number> = {
  [ADD_OPERATOR]: 1,
  [SUBTRACT_OPERATOR]: 1,
  [MULTIPLY_OPERATOR]: 2,
  [DIVIDE_OPERATOR]: 2,
  [MODULO_OPERATOR]: 2,
};

export const OPERATORS_ASSOCIATIVITY: Record<Operators, "left" | "right"> = {
  [ADD_OPERATOR]: "left",
  [SUBTRACT_OPERATOR]: "left",
  [MULTIPLY_OPERATOR]: "left",
  [DIVIDE_OPERATOR]: "left",
  [MODULO_OPERATOR]: "left",
};

export function isOperator(value: string): value is Operators {
  return (OPERATORS as readonly string[]).includes(value);
}
