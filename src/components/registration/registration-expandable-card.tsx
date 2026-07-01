"use client";

import { useEffect, useRef } from "react";

import { RegistrationForm } from "@/components/registration/registration-form";
import { registrationContent } from "@/content/registration";

export function RegistrationExpandableCard() {
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const focusForm = () => {
      if (window.location.hash === "#register") {
        requestAnimationFrame(() => {
          document.getElementById("register")?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          formRef.current?.querySelector<HTMLInputElement>("input")?.focus();
        });
      }
    };

    focusForm();
    window.addEventListener("hashchange", focusForm);
    return () => window.removeEventListener("hashchange", focusForm);
  }, []);

  return (
    <div ref={formRef} className="registration-card">
      <p className="text-primary text-xs font-semibold tracking-[0.15em] uppercase">
        Free registration
      </p>
      <h2 className="text-foreground mt-2 text-xl font-bold tracking-tight md:text-2xl">
        {registrationContent.title}
      </h2>

      <div className="mt-5">
        <RegistrationForm />
      </div>

      <p className="text-muted-foreground mt-4 text-center text-xs leading-relaxed">
        {registrationContent.footnote}
      </p>
    </div>
  );
}
