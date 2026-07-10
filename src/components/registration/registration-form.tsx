"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { setMetaPixelLeadPending } from "@/components/analytics/meta-pixel-events";
import { PrimaryCtaButton } from "@/components/ui/primary-cta-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registrationContent } from "@/content/registration";
import {
  registrationSchema,
  type RegistrationFormValues,
} from "@/lib/validations/registration";
import { cn } from "@/lib/utils";

const inputClassName =
  "h-10 focus-visible:border-orange-500 focus-visible:ring-orange-500/30";

export function RegistrationForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      mobile: "",
    },
  });

  const onSubmit = async (data: RegistrationFormValues) => {
    setSubmitError(null);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const payload = (await response.json()) as {
        error?: string;
        registrationId?: string;
      };

      if (!response.ok) {
        setSubmitError(
          payload.error ??
            "We couldn't complete your registration. Please try again."
        );
        return;
      }

      setMetaPixelLeadPending();
      const thankYouUrl = payload.registrationId
        ? `/thank-you?registration=${encodeURIComponent(payload.registrationId)}`
        : "/thank-you";
      window.location.assign(thankYouUrl);
    } catch {
      setSubmitError(
        "We couldn't reach the registration service. Please check your connection and try again."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-3.5 text-left"
    >
      <div className="space-y-1.5">
        <Label htmlFor="fullName">
          {registrationContent.fields.fullName.label}
        </Label>
        <Input
          id="fullName"
          type="text"
          autoComplete="name"
          placeholder={registrationContent.fields.fullName.placeholder}
          aria-invalid={Boolean(errors.fullName)}
          className={cn(inputClassName, errors.fullName && "border-destructive")}
          disabled={isSubmitting}
          {...register("fullName")}
        />
        {errors.fullName ? (
          <p className="text-destructive text-sm" role="alert">
            {errors.fullName.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">{registrationContent.fields.email.label}</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder={registrationContent.fields.email.placeholder}
          aria-invalid={Boolean(errors.email)}
          className={cn(inputClassName, errors.email && "border-destructive")}
          disabled={isSubmitting}
          {...register("email")}
        />
        {errors.email ? (
          <p className="text-destructive text-sm" role="alert">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="mobile">{registrationContent.fields.mobile.label}</Label>
        <Input
          id="mobile"
          type="tel"
          autoComplete="tel"
          placeholder={registrationContent.fields.mobile.placeholder}
          aria-invalid={Boolean(errors.mobile)}
          className={cn(inputClassName, errors.mobile && "border-destructive")}
          disabled={isSubmitting}
          {...register("mobile")}
        />
        {errors.mobile ? (
          <p className="text-destructive text-sm" role="alert">
            {errors.mobile.message}
          </p>
        ) : null}
      </div>

      {submitError ? (
        <p className="text-destructive text-sm" role="alert">
          {submitError}
        </p>
      ) : null}

      <PrimaryCtaButton
        type="submit"
        label={
          isSubmitting
            ? registrationContent.completeSubmitting
            : registrationContent.submitLabel
        }
        fullWidth
        disabled={isSubmitting}
        className="mt-1"
      />
    </form>
  );
}
