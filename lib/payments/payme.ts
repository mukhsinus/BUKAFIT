/**
 * Payme payment adapter — STUB ONLY.
 *
 * Do not enable until the club provides merchant credentials.
 *
 * Required env (when ready):
 * - PAYME_MERCHANT_ID
 * - PAYME_SECRET_KEY
 *
 * Official docs: https://developer.help.paycom.uz/
 *
 * Integration outline:
 * 1. Create payment via Payme Merchant API / checkout form
 * 2. Redirect or embed Payme checkout
 * 3. Handle Merchant API callbacks (CheckPerformTransaction, PerformTransaction, …)
 * 4. Verify auth header with PAYME_SECRET_KEY
 * 5. Map Payme states → PaymentStatus in provider.ts
 *
 * Until then: lead form is the only checkout path.
 */

import type {
  PaymentCreateResult,
  PaymentProvider,
  PaymentStatus,
} from "./provider";

export const paymePaymentProvider: PaymentProvider = {
  id: "payme",
  async createPayment(): Promise<PaymentCreateResult> {
    // TODO: implement Payme create payment when merchant data arrives
    throw new Error(
      "Payme adapter is a stub. Set merchant env vars and implement createPayment.",
    );
  },
  async getStatus(): Promise<PaymentStatus> {
    // TODO: implement Payme status check
    return "unknown";
  },
};
