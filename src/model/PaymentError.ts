export class PaymentError extends Error {
  isCardError: boolean;
  constructor(message: string, isCardError: boolean) {
    super(message);
    this.isCardError = isCardError;
  }
}

export class OutOfStockError extends Error {
  constructor() {
    super("product out of stock");
  }
}

export class EmptyCartError extends Error {
  constructor() {
    super("cart is empty");
  }
}
