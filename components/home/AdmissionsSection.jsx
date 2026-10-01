import Link from "next/link";
import { ArrowRight, CalendarDays, FileText } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { admissionSteps, documents, keyDates } from "@/data/home";
import { cn } from "@/lib/utils/cn";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function AdmissionsSection() {
  return (
    <section id="admissions" className="relative overflow-hidden bg-[#0F2A4A] py-20 text-white sm:py-28">
      <div aria-hidden className="absolute -left-32 top-0 size-[28rem] rounded-full bg-[#C9A24B]/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div>
          <Reveal><SectionHeading light eyebrow="Admissions" title="Your path to enrollment, in four steps." description="A clear, friendly process. Our admissions team is with you at every step." /></Reveal>

          <Stagger className="mt-10 space-y-5">
            {admissionSteps.map((s, i) => (
              <StaggerItem key={s.title}>
                <div className="relative flex gap-5 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#C9A24B] font-serif text-xl font-semibold text-[#0F2A4A]">{i + 1}</span>
                  <div>
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-white/70">{s.text}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal delay={0.1} className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl bg-white p-6 text-slate-900 shadow-2xl sm:p-8">
            <h3 className="flex items-center gap-2 font-serif text-xl font-semibold"><CalendarDays className="size-5 text-[#9A7A2E]" /> Key dates</h3>
            <dl className="mt-4 divide-y">
              {keyDates.map((d) => (
                <div key={d.label} className="flex items-center justify-between gap-4 py-3 text-sm">
                  <dt className="text-slate-500">{d.label}</dt>
                  <dd className="text-right font-semibold">{d.value}</dd>
                </div>
              ))}
            </dl>

            <h3 className="mt-6 flex items-center gap-2 font-serif text-xl font-semibold"><FileText className="size-5 text-[#9A7A2E]" /> Documents you need</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {documents.map((d) => <li key={d} className="flex gap-2"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#C9A24B]" />{d}</li>)}
            </ul>

            <div className="mt-7 flex flex-col gap-2">
              <Link href="/contact?topic=admissions" className={cn(buttonVariants({ size: "lg" }), "w-full bg-[#0F2A4A] hover:bg-[#0F2A4A]/90")}>Apply now <ArrowRight className="size-4" /></Link>
              <Link href="/contact" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full border-slate-300 bg-white text-slate-900 hover:bg-slate-50")}>Talk to admissions</Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
