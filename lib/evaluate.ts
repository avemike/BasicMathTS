import { ExpressionNode } from "./expression";

export function evaluate(node: ExpressionNode): number {
  if (!node.left && !node.right) {
    return parseFloat(node.value);
  }

  const leftValue = evaluate(node.left!);
  const rightValue = evaluate(node.right!);

  switch (node.value) {
    case "+":
      return leftValue + rightValue;
    case "-":
      return leftValue - rightValue;
    case "*":
      return leftValue * rightValue;
    case "/":
      if (rightValue === 0) {
        throw new Error("Division by zero");
      }
      return leftValue / rightValue;
    default:
      throw new Error(`Unknown operator: ${node.value}`);
  }
}
