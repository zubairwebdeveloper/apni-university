import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { programs } from "@/data/home";
import { cn } from "@/lib/utils/cn";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function ProgramsSection() {
  return (
    <section id="programs" className="border-y bg-muted/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <SectionHeading eyebrow="Programs" title="Find the field you want to master." description="Seven areas of study, each built with industry input and taught through real projects." />
          </Reveal>
          <Link href="/courses" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-fit")}>Browse all programs <ArrowRight className="size-4" /></Link>
        </div>

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.06}>
          {programs.map(({ icon: Icon, title, text, tag }) => (
            <StaggerItem key={title}>
              <Link href={`/courses?q=${encodeURIComponent(title)}`} className="group relative block h-full overflow-hidden rounded-2xl border bg-card p-6 transition-all hover:-translate-y-1 hover:border-[#C9A24B]/60 hover:shadow-lg">
                <div className="flex items-start justify-between">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-[#0F2A4A] text-[#C9A24B] transition-transform group-hover:scale-105"><Icon className="size-6" /></span>
                  {tag ? <Badge className="bg-[#C9A24B] text-[#0F2A4A] hover:bg-[#C9A24B]">{tag}</Badge> : <ArrowUpRight className="size-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />}
                </div>
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{text}</p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
