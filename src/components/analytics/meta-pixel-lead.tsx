"use client";

import { useEffect, useRef } from "react";

import {
  consumeMetaPixelLeadPending,
  hasMetaPixelLeadPending,
  trackMetaPixelEvent,
} from "@/components/analytics/meta-pixel-events";

const MAX_ATTEMPTS = 50;
const RETRY_INTERVAL_MS = 100;

export function MetaPixelLead() {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current || !hasMetaPixelLeadPending()) {
      return;
    }

    let attempts = 0;
    const timer = window.setInterval(() => {
      if (trackMetaPixelEvent("Lead")) {
        tracked.current = true;
        consumeMetaPixelLeadPending();
        window.clearInterval(timer);
        return;
      }

      if (++attempts >= MAX_ATTEMPTS) {
        window.clearInterval(timer);
      }
    }, RETRY_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, []);

  return null;
}
