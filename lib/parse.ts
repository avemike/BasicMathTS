import { ExpressionNode } from "./expression";
import {
  isOperator,
  OPERATORS_ASSOCIATIVITY,
  OPERATORS_PRECEDENCE,
} from "./operators";
import { Token, TOKEN_TYPE } from "./token";

export function parse(tokens: Token[]): ExpressionNode {
  const queue: (Token | ExpressionNode)[] = [];
  const operatorStack: Token<"operator">[] = [];

  // 1. Convert the infix expression to postfix notation
  for (const token of tokens) {
    ({
      [TOKEN_TYPE.number]: () => processNumber(token as Token<"number">, queue),
      [TOKEN_TYPE.operator]: () =>
        processOperator(token as Token<"operator">, operatorStack, queue),
      [TOKEN_TYPE.parenthesis]: () =>
        processParenthesis(token as Token<"parenthesis">, operatorStack, queue),
    })[token.type]();
  }

  // 2. Pop the remaining operators from the stack
  while (operatorStack.length > 0) {
    queue.push(operatorStack.pop()!);
  }

  const expressionStack: ExpressionNode[] = [];

  // 3. Build the expression tree
  for (const item of queue) {
    if (item instanceof ExpressionNode) {
      expressionStack.push(item);

      continue;
    }

    const right = expressionStack.pop()!;
    const left = expressionStack.pop()!;

    expressionStack.push(new ExpressionNode(item.value, left, right));
  }

  // 4. Return the root of the expression tree
  return expressionStack[0];
}

function processNumber(token: Token, queue: (Token | ExpressionNode)[]) {
  queue.push(new ExpressionNode(token.value));
}

function processParenthesis(
  token: Token,
  operatorStack: Token[],
  queue: (Token | ExpressionNode)[]
) {
  if (token.value === "(") {
    operatorStack.push(token);
  } else if (token.value === ")") {
    while (
      operatorStack.length > 0 &&
      operatorStack[operatorStack.length - 1].value !== "("
    ) {
      queue.push(operatorStack.pop()!);
    }
    operatorStack.pop();
  }
}

function processOperator(
  token: Token<"operator">,
  operatorStack: Token<"operator">[],
  queue: (Token | ExpressionNode)[]
) {
  if (!isOperator(token.value)) {
    throw new Error(`Invalid operator: ${token.value}`);
  }

  const precedence = OPERATORS_PRECEDENCE[token.value];
  const associativity = OPERATORS_ASSOCIATIVITY[token.value];

  while (
    operatorStack.length > 0 &&
    operatorStack[operatorStack.length - 1].type === TOKEN_TYPE.operator &&
    shouldPopOperator(
      operatorStack[operatorStack.length - 1],
      precedence,
      associativity
    )
  ) {
    queue.push(operatorStack.pop()!);
  }

  operatorStack.push(token);
}

function shouldPopOperator(
  topOperator: Token<"operator">,
  currentPrecedence: number,
  currentAssociativity: "left" | "right"
): boolean {
  const topPrecedence = OPERATORS_PRECEDENCE[topOperator.value];

  return (
    (currentAssociativity === "left" && currentPrecedence <= topPrecedence) ||
    (currentAssociativity === "right" && currentPrecedence < topPrecedence)
  );
}
