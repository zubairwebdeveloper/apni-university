export default function SectionHeading({ eyebrow, title, description, align = "left", light = false, className = "" }) {
  const center = align === "center";
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow && (
        <p className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] ${light ? "text-[#C9A24B]" : "text-[#9A7A2E] dark:text-[#C9A24B]"}`}>
          <span className="h-px w-8 bg-current" />
          {eyebrow}
        </p>
      )}
      <h2 className={`mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl ${light ? "text-white" : ""}`}>{title}</h2>
      {description && <p className={`mt-4 text-lg leading-8 ${light ? "text-white/70" : "text-muted-foreground"}`}>{description}</p>}
    </div>
  );
}
