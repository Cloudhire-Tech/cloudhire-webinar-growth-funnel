import { registrationContent } from "@/content/registration";
import { cn } from "@/lib/utils";

export function RegistrationProofRow() {
  return (
    <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-center text-xs text-muted-foreground">
      <div className="flex -space-x-1.5" aria-hidden>
        {registrationContent.proofAvatars.map((initial, index) => (
          <span
            key={initial}
            className={cn(
              "flex size-6 items-center justify-center rounded-full border-2 border-white text-[10px] font-semibold",
              index === registrationContent.proofAvatars.length - 1
                ? "bg-stone-200 text-stone-600"
                : "bg-orange-100 text-orange-700"
            )}
          >
            {initial}
          </span>
        ))}
      </div>
      <p className="leading-snug">
        <span className="font-medium text-[#2BD576]">
          {registrationContent.proofExcellent}
        </span>
        {registrationContent.proofText.slice(
          registrationContent.proofExcellent.length
        )}
      </p>
    </div>
  );
}
