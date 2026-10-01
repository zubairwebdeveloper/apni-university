import Link from "next/link";
import { ArrowRight, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { gradientFor } from "@/lib/utils/course";
import { initials } from "@/lib/utils/text";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function FacultySection({ faculty }) {
  return (
    <section id="faculty" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal><SectionHeading eyebrow="Faculty" title="Learn from people who do the work." description="Our instructors are professionals and academics who bring real experience into every class." /></Reveal>
          <Link href="/instructors" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-fit")}>Meet all instructors <ArrowRight className="size-4" /></Link>
        </div>

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {faculty.map((p, i) => (
            <StaggerItem key={p.id ?? i}>
              <Link href="/instructors" className="group block overflow-hidden rounded-2xl border bg-card transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="relative aspect-[4/5] overflow-hidden" style={{ background: gradientFor(p.name) }}>
                  {p.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.avatar} alt={p.name} loading="lazy" className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <span className="flex size-full items-center justify-center font-serif text-5xl font-semibold text-white/90">{initials(p.name)}</span>
                  )}
                </div>
                <div className="space-y-2 p-5">
                  <Badge variant="secondary">{p.specialty}</Badge>
                  <h3 className="text-lg font-semibold leading-tight">{p.name}</h3>
                  <p className="line-clamp-1 text-sm text-muted-foreground">{p.headline}</p>
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground"><Briefcase className="size-3.5" />{p.experience ?? 0} years experience</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
