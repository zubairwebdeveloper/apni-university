import { Quote, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { gradientFor } from "@/lib/utils/course";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function TestimonialsSection({ reviews }) {
  return (
    <section id="stories" className="border-y bg-muted/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal><SectionHeading align="center" eyebrow="Student stories" title="Loved by learners, trusted by employers." description="Real experiences from students who learned, practiced and grew with us." /></Reveal>
        <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <StaggerItem key={r.id ?? i}>
              <Card className="relative h-full py-0"><CardContent className="flex h-full flex-col p-7">
                <Quote className="absolute right-6 top-6 size-10 text-[#C9A24B]/25" />
                <div className="flex gap-0.5" role="img" aria-label={`${r.rating} out of 5 stars`}>
                  {[1, 2, 3, 4, 5].map((n) => <Star key={n} className={`size-4 ${n <= r.rating ? "fill-[#C9A24B] text-[#C9A24B]" : "text-muted-foreground/30"}`} />)}
                </div>
                <p className="mt-5 flex-1 leading-7 text-foreground/80">{r.comment}</p>
                <div className="mt-6 flex items-center gap-3 border-t pt-5">
                  <span className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-full font-semibold text-white" style={{ background: gradientFor(r.reviewer) }}>
                    {r.avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={r.avatar} alt="" loading="lazy" className="size-full object-cover" />
                    ) : r.reviewer?.charAt(0)}
                  </span>
                  <span><span className="block text-sm font-semibold">{r.reviewer}</span><span className="text-xs text-muted-foreground">{r.reviewerRole || r.course}</span></span>
                </div>
              </CardContent></Card>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
