"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { PrimaryCtaButton } from "@/components/ui/primary-cta-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registrationContent } from "@/content/registration";
import {
  openRazorpayCheckout,
  preloadRazorpayScript,
} from "@/lib/payment/open-checkout";
import {
  registrationSchema,
  type RegistrationFormValues,
} from "@/lib/validations/registration";
import { cn } from "@/lib/utils";

const inputClassName =
  "h-10 focus-visible:border-orange-500 focus-visible:ring-orange-500/30";

type RegisterApiResponse = {
  error?: string;
  registrationId?: string;
  orderId?: string;
  amount?: number;
  currency?: string;
  keyId?: string;
};

export function RegistrationForm() {
  const router = useRouter();
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

  useEffect(() => {
    let idleId: number | undefined;
    let timeoutId: number | undefined;

    const warmCheckout = () => {
      void preloadRazorpayScript();
    };

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(warmCheckout, { timeout: 2500 });
    } else {
      timeoutId = window.setTimeout(warmCheckout, 1200);
    }

    return () => {
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  const onSubmit = async (data: RegistrationFormValues) => {
    setSubmitError(null);

    // Warm the checkout script while the registration/order API runs.
    const scriptWarmup = preloadRazorpayScript();

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const payload = (await response.json()) as RegisterApiResponse;

      if (!response.ok) {
        setSubmitError(
          payload.error ??
            "We couldn't start your registration. Please try again."
        );
        return;
      }

      if (
        !payload.registrationId ||
        !payload.orderId ||
        !payload.amount ||
        !payload.currency ||
        !payload.keyId
      ) {
        setSubmitError(
          "We couldn't start payment. Please try again in a moment."
        );
        return;
      }

      const thankYouPath = `/thank-you?registration=${encodeURIComponent(payload.registrationId)}`;
      router.prefetch(thankYouPath);

      await scriptWarmup;

      const checkoutResult = await openRazorpayCheckout({
        registrationId: payload.registrationId,
        orderId: payload.orderId,
        amount: payload.amount,
        currency: payload.currency,
        keyId: payload.keyId,
        prefill: {
          name: data.fullName.trim(),
          email: data.email.trim(),
          contact: data.mobile.trim(),
        },
      });

      if (checkoutResult === "paid") {
        window.location.assign(thankYouPath);
        return;
      }

      if (checkoutResult === "failed") {
        setSubmitError(
          "Payment failed. Please try again to complete your registration."
        );
        return;
      }

      setSubmitError(
        "Payment was not completed. Your seat is not reserved until payment succeeds."
      );
    } catch {
      setSubmitError(
        "We couldn't complete payment. Please check your connection and try again."
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
