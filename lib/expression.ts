class ExpressionNode {
  value: string;
  left: ExpressionNode | null;
  right: ExpressionNode | null;

  constructor(
    value: string,
    left: ExpressionNode | null = null,
    right: ExpressionNode | null = null
  ) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}
