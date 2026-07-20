/** Full-viewport cover so the landing page never flashes after Razorpay closes. */
export function showPaymentSuccessTransition() {
  if (typeof document === "undefined") {
    return;
  }

  if (document.getElementById("payment-success-transition")) {
    return;
  }

  const overlay = document.createElement("div");
  overlay.id = "payment-success-transition";
  overlay.setAttribute("aria-live", "polite");
  overlay.setAttribute("aria-busy", "true");
  overlay.style.cssText = [
    "position:fixed",
    "inset:0",
    "z-index:2147483646",
    "background:#ffffff",
    "display:flex",
    "align-items:center",
    "justify-content:center",
    "font-family:system-ui,sans-serif",
    "font-size:15px",
    "color:#525252",
  ].join(";");
  overlay.textContent = "Confirming your payment…";
  document.body.appendChild(overlay);
}

export function redirectToThankYou(thankYouPath: string) {
  showPaymentSuccessTransition();

  // Warm the Thank You document while we hand off navigation.
  const prefetch = document.createElement("link");
  prefetch.rel = "prefetch";
  prefetch.href = thankYouPath;
  prefetch.as = "document";
  document.head.appendChild(prefetch);

  window.location.replace(thankYouPath);
}
