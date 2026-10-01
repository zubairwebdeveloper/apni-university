import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import HomeCourseCard from "./HomeCourseCard";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function FeaturedCourses({ courses }) {
  return (
    <section id="courses" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal><SectionHeading eyebrow="Featured programs" title="Start with a program students love." description="Popular, career-focused programs with practical projects and mentor feedback." /></Reveal>
          <Link href="/courses" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-fit")}>View all programs <ArrowRight className="size-4" /></Link>
        </div>
        <Stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((c, i) => <StaggerItem key={c.id ?? i}><HomeCourseCard course={c} /></StaggerItem>)}
        </Stagger>
      </div>
    </section>
  );
}
