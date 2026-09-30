import { cn } from "@/lib/utils/cn";

export function SectionHeading({ eyebrow, title, description, align = "center", className }) {
  return (
    <div className={cn("space-y-3", align === "center" ? "text-center" : "text-left", className)}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">{eyebrow}</p>
      )}
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {description && (
        <p className={cn("text-muted-foreground", align === "center" && "mx-auto max-w-2xl")}>
          {description}
        </p>
      )}
    </div>
  );
}
