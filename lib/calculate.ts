import { evaluate } from "./evaluate";
import { parse } from "./parse";
import { tokenize } from "./tokenize";

export function calculate(expression: string): number {
  const tokens = tokenize(expression);
  const tree = parse(tokens);

  return evaluate(tree);
}
