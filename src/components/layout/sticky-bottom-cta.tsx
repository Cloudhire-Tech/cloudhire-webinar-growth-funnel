"use client";

import { useEffect, useState } from "react";

import { PrimaryCtaButton } from "@/components/ui/primary-cta-button";
import { cn } from "@/lib/utils";

type StickyBottomCtaProps = {
  line1: string;
  line2: string;
  button: string;
};

export function StickyBottomCta({
  line1,
  line2,
  button,
}: StickyBottomCtaProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById("register");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0.15, rootMargin: "-8px 0px 0px 0px" }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[var(--brand-navy)]/95 px-4 py-3 backdrop-blur-md transition-transform duration-300 md:px-6",
        visible ? "translate-y-0" : "translate-y-full pointer-events-none"
      )}
      aria-hidden={!visible}
    >
      <div className="container-shell flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="font-mono text-[10px] font-medium tracking-[0.1em] text-white/60 uppercase sm:text-[11px]">
            {line1}
          </p>
          <p className="truncate text-sm font-bold text-white sm:text-base">
            {line2}
          </p>
        </div>
        <PrimaryCtaButton
          href="#register"
          label={button}
          className="h-10 shrink-0 px-4 text-xs sm:h-11 sm:px-5 sm:text-sm"
        />
      </div>
    </div>
  );
}
