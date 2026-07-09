"use client";

import { useEffect, useRef } from "react";

import { trackMetaPixelEvent } from "@/components/analytics/meta-pixel-events";

const MAX_ATTEMPTS = 50;
const RETRY_INTERVAL_MS = 100;

export function MetaPixelViewContent() {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) {
      return;
    }

    let attempts = 0;
    const timer = window.setInterval(() => {
      if (trackMetaPixelEvent("ViewContent")) {
        tracked.current = true;
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
