import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
};

export function SectionHeader({
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-8 md:mb-9",
        align === "center" && "mx-auto max-w-2xl text-center",
        align === "left" && "max-w-2xl text-left",
        className
      )}
    >
      <h2 className="text-foreground text-2xl font-semibold tracking-tight md:text-3xl">
        {title}
      </h2>
      <div
        className={cn(
          "mt-3 h-1 w-10 rounded-full bg-primary",
          align === "center" && "mx-auto"
        )}
        aria-hidden
      />
      {subtitle ? (
        <p className="text-muted-foreground mt-4 text-base leading-relaxed">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
