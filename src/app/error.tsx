"use client";

import { useEffect } from "react";

import { CloudHireLogo } from "@/components/brand/cloudhire-logo";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-white px-6 text-center">
      <CloudHireLogo href="/" className="mb-8" />
      <h1 className="text-2xl font-semibold text-neutral-900">
        Something went wrong
      </h1>
      <p className="mt-3 max-w-md text-sm text-neutral-600">
        The page failed to load. Please refresh or try again.
      </p>
      <Button className="mt-6" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
