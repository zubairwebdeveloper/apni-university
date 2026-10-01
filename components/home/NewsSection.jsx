import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { formatDate, gradientFor } from "@/lib/utils/course";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function NewsSection({ posts }) {
  return (
    <section id="news" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal><SectionHeading eyebrow="News and stories" title="The latest from campus." description="Announcements, study tips and career advice from our team." /></Reveal>
          <Link href="/blog" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-fit")}>Read the blog <ArrowRight className="size-4" /></Link>
        </div>
        <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((p, i) => (
            <StaggerItem key={p.id ?? i}>
              <Link href={p.slug ? `/blog/${p.slug}` : "/blog"} className="group block h-full overflow-hidden rounded-2xl border bg-card transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="aspect-video overflow-hidden" style={{ background: gradientFor(p.title) }}>
                  {p.coverImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.coverImage} alt="" loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  )}
                </div>
                <div className="space-y-3 p-6">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <Badge variant="secondary">{p.category}</Badge>
                    <span className="flex items-center gap-1"><CalendarDays className="size-3.5" />{formatDate(p.createdAt)}</span>
                  </div>
                  <h3 className="line-clamp-2 font-serif text-xl font-semibold leading-snug group-hover:underline">{p.title}</h3>
                  <p className="line-clamp-2 text-sm leading-6 text-muted-foreground">{p.excerpt}</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
