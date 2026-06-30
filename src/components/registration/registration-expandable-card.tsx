"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { RegistrationForm } from "@/components/registration/registration-form";
import { PrimaryCtaButton } from "@/components/ui/primary-cta-button";
import { registrationContent } from "@/content/registration";
import { cn } from "@/lib/utils";

function scrollToRegister() {
  requestAnimationFrame(() => {
    document.getElementById("register")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  });
}

export function RegistrationExpandableCard() {
  const [expanded, setExpanded] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const openRegistration = useCallback((scroll = false) => {
    setExpanded(true);
    if (scroll) {
      scrollToRegister();
    }
  }, []);

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === "#register") {
        openRegistration(true);
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [openRegistration]);

  useEffect(() => {
    if (expanded && formRef.current) {
      formRef.current.querySelector<HTMLInputElement>("input")?.focus();
    }
  }, [expanded]);

  return (
    <div
      className={cn(
        "registration-card mx-auto max-w-lg text-center transition-shadow duration-300",
        expanded && "ring-2 ring-orange-200/80"
      )}
    >
      <h2 className="text-foreground text-2xl font-semibold tracking-tight md:text-3xl">
        {registrationContent.title}
      </h2>

      <div className="mt-5">
        {!expanded ? (
          <PrimaryCtaButton
            type="button"
            label={registrationContent.revealButton}
            fullWidth
            className="mx-auto max-w-sm"
            onClick={() => openRegistration(false)}
          />
        ) : null}

        <div
          className="expand-panel"
          data-expanded={expanded}
          aria-hidden={!expanded}
        >
          <div ref={formRef} className="expand-panel-inner">
            <div className={cn(expanded && "pt-5")}>
              <RegistrationForm />
            </div>
          </div>
        </div>
      </div>

      <p className="text-muted-foreground mt-4 text-xs">
        {registrationContent.footnote}
      </p>
    </div>
  );
}
