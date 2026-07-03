"use client";

import { useEffect } from "react";

import { RegistrationExpandableCard } from "@/components/registration/registration-expandable-card";

export function RegistrationSection() {
  useEffect(() => {
    const focusForm = () => {
      if (window.location.hash === "#register") {
        requestAnimationFrame(() => {
          document.getElementById("register")?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          document
            .getElementById("register")
            ?.querySelector<HTMLInputElement>("input")
            ?.focus();
        });
      }
    };

    focusForm();
    window.addEventListener("hashchange", focusForm);
    return () => window.removeEventListener("hashchange", focusForm);
  }, []);

  return (
    <div id="register" className="scroll-mt-24 lg:scroll-mt-28">
      <RegistrationExpandableCard />
    </div>
  );
}
