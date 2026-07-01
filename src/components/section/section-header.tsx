import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  align?: "center" | "left";
  className?: string;
  dark?: boolean;
};

export function SectionHeader({
  title,
  subtitle,
  eyebrow,
  align = "center",
  className,
  dark = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-10 md:mb-12",
        align === "center" && "mx-auto max-w-2xl text-center",
        align === "left" && "max-w-2xl text-left",
        className
      )}
    >
      {eyebrow ? (
        <p className={cn("section-eyebrow", dark && "text-orange-400")}>
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl",
          dark ? "text-white" : "text-foreground"
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed md:text-lg",
            dark ? "text-white/65" : "text-muted-foreground"
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
