"use client";

import { useEffect, type ReactNode } from "react";

type RegistrationHashScrollProps = {
  children: ReactNode;
};

export function RegistrationHashScroll({
  children,
}: RegistrationHashScrollProps) {
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

  return children;
}
