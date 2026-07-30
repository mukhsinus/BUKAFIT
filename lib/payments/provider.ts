/**
 * PaymentProvider — online checkout adapters (Click / Payme).
 *
 * Real merchant credentials are NOT available yet.
 * Default conversion path = lead form → Telegram manager.
 * When the club provides merchant data, wire an adapter here without
 * rewriting pricing pages.
 */

export type PaymentCreateInput = {
  planId: string;
  amountUzs: number;
  orderId: string;
  returnUrl: string;
  description?: string;
};

export type PaymentCreateResult = {
  paymentId: string;
  checkoutUrl: string;
};

export type PaymentStatus =
  | "pending"
  | "paid"
  | "failed"
  | "cancelled"
  | "unknown";

export type PaymentProvider = {
  readonly id: "click" | "payme" | "stub";
  createPayment: (input: PaymentCreateInput) => Promise<PaymentCreateResult>;
  getStatus: (paymentId: string) => Promise<PaymentStatus>;
};

/** Default: no online payment — use lead flow instead */
export const stubPaymentProvider: PaymentProvider = {
  id: "stub",
  async createPayment() {
    throw new Error(
      "Online payment is not connected. Use the lead form. See lib/payments/click.ts and payme.ts.",
    );
  },
  async getStatus() {
    return "unknown";
  },
};

export function getActivePaymentProvider(): PaymentProvider {
  // TODO: select click/payme when env merchant credentials exist
  return stubPaymentProvider;
}
