export class PaymentError extends Error {
  isCardError: boolean;
  constructor(message: string, isCardError: boolean) {
    super(message);
    this.isCardError = isCardError;
  }
}
