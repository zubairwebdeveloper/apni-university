import Link from "next/link";
import { scholarships } from "@/data/home";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function ScholarshipsSection() {
  return (
    <section id="scholarships" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal><SectionHeading align="center" eyebrow="Fees and scholarships" title="Great education should be within reach." description="Fees depend on the program and are shown on every program page. These support options help make study affordable." /></Reveal>
        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {scholarships.map(({ icon: Icon, title, text }) => (
            <StaggerItem key={title}>
              <div className="h-full rounded-2xl border bg-card p-6 text-center transition-shadow hover:shadow-lg">
                <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#C9A24B]/15 text-[#9A7A2E] dark:text-[#C9A24B]"><Icon className="size-7" /></span>
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Want to know what you may qualify for? <Link href="/contact?topic=scholarships" className="font-medium text-foreground underline underline-offset-4">Ask our admissions team</Link>.
        </p>
      </div>
    </section>
  );
}
