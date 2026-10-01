import { ChevronDown } from "lucide-react";
import { faqs } from "@/data/home";
import { Reveal } from "./Reveal";
import SectionHeading from "./SectionHeading";

// Native <details> keeps this fully accessible and JavaScript-free.
export default function FaqSection() {
  return (
    <section id="faq" className="border-y bg-muted/40 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal><SectionHeading align="center" eyebrow="FAQ" title="Questions students ask us most." /></Reveal>
        <Reveal delay={0.1} className="mt-10 space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-xl border bg-card px-5 transition-shadow open:shadow-md">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-medium [&::-webkit-details-marker]:hidden">
                {f.q}
                <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <p className="pb-5 text-sm leading-7 text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
