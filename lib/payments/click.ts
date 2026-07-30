/**
 * Click payment adapter — STUB ONLY.
 *
 * Do not enable until the club provides merchant credentials.
 *
 * Required env (when ready):
 * - CLICK_MERCHANT_ID
 * - CLICK_SERVICE_ID
 * - CLICK_SECRET_KEY
 * - CLICK_MERCHANT_USER_ID (if required by current Click API)
 *
 * Official docs: https://docs.click.uz/
 *
 * Integration outline:
 * 1. Create invoice / prepare payment via Click Merchant API
 * 2. Redirect user to Click checkout URL
 * 3. Handle webhook / status callback; verify signature with CLICK_SECRET_KEY
 * 4. Map Click statuses → PaymentStatus in provider.ts
 *
 * Until then: lead form is the only checkout path.
 */

import type {
  PaymentCreateResult,
  PaymentProvider,
  PaymentStatus,
} from "./provider";

export const clickPaymentProvider: PaymentProvider = {
  id: "click",
  async createPayment(): Promise<PaymentCreateResult> {
    // TODO: implement Click create invoice when merchant data arrives
    throw new Error(
      "Click adapter is a stub. Set merchant env vars and implement createPayment.",
    );
  },
  async getStatus(): Promise<PaymentStatus> {
    // TODO: implement Click status check
    return "unknown";
  },
};
