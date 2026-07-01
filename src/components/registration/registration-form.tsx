"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  PrimaryCtaButton,
} from "@/components/ui/primary-cta-button";
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
    void data;
    await new Promise((resolve) => setTimeout(resolve, 400));
    window.location.assign("/thank-you");
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
          {...register("mobile")}
        />
        {errors.mobile ? (
          <p className="text-destructive text-sm" role="alert">
            {errors.mobile.message}
          </p>
        ) : null}
      </div>

      <PrimaryCtaButton
        type="submit"
        label={
          isSubmitting
            ? registrationContent.completeSubmitting
            : registrationContent.submitLabel
        }
        fullWidth
        disabled={isSubmitting}
        className="mt-2"
      />
    </form>
  );
}
