/** Display / stored price in INR rupees. Razorpay Orders use paise (×100). */
export const WEBINAR_PAYMENT_AMOUNT_INR = 9;
export const WEBINAR_ORIGINAL_PRICE_INR = 199;
export const WEBINAR_PAYMENT_CURRENCY = "INR";
export const WEBINAR_PAYMENT_PROVIDER = "razorpay";

export function getWebinarPaymentAmountPaise() {
  return WEBINAR_PAYMENT_AMOUNT_INR * 100;
}
