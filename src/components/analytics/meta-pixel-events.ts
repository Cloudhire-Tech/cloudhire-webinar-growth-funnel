export const META_PIXEL_LEAD_PENDING_KEY = "meta-pixel-lead-pending";

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
  if (typeof window === "undefined" || typeof window.fbq !== "function") {
    return false;
  }

  window.fbq("track", eventName);
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
