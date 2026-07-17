export const META_PIXEL_LEAD_PENDING_KEY = "meta-pixel-lead-pending";
export const META_PIXEL_PURCHASE_PENDING_KEY = "meta-pixel-purchase-pending";

type FbqFunction = (
  command: "track",
  eventName: string,
  params?: Record<string, unknown>
) => void;

declare global {
  interface Window {
    fbq?: FbqFunction;
  }
}

export function trackMetaPixelEvent(eventName: string): boolean {
  return trackMetaPixelEventWithParams(eventName);
}

export function trackMetaPixelEventWithParams(
  eventName: string,
  params?: Record<string, unknown>
): boolean {
  if (typeof window === "undefined" || typeof window.fbq !== "function") {
    return false;
  }

  if (params) {
    window.fbq("track", eventName, params);
  } else {
    window.fbq("track", eventName);
  }

  return true;
}

export function setMetaPixelLeadPending() {
  sessionStorage.setItem(META_PIXEL_LEAD_PENDING_KEY, "1");
}

export function hasMetaPixelLeadPending(): boolean {
  return sessionStorage.getItem(META_PIXEL_LEAD_PENDING_KEY) === "1";
}

export function consumeMetaPixelLeadPending(): boolean {
  if (!hasMetaPixelLeadPending()) {
    return false;
  }

  sessionStorage.removeItem(META_PIXEL_LEAD_PENDING_KEY);
  return true;
}

export function setMetaPixelPurchasePending() {
  sessionStorage.setItem(META_PIXEL_PURCHASE_PENDING_KEY, "1");
}

export function hasMetaPixelPurchasePending(): boolean {
  return sessionStorage.getItem(META_PIXEL_PURCHASE_PENDING_KEY) === "1";
}

export function consumeMetaPixelPurchasePending(): boolean {
  if (!hasMetaPixelPurchasePending()) {
    return false;
  }

  sessionStorage.removeItem(META_PIXEL_PURCHASE_PENDING_KEY);
  return true;
}
