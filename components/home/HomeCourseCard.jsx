import Link from "next/link";
import { ArrowRight, Clock, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice, gradientFor } from "@/lib/utils/course";

export default function HomeCourseCard({ course }) {
  const href = course.id ? `/courses/${course.id}` : "/courses";
  return (
    <Link href={href} className="group block h-full rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F2A4A]">
      <Card className="h-full gap-0 overflow-hidden py-0 transition-all group-hover:-translate-y-1 group-hover:shadow-xl">
        <div className="relative aspect-video overflow-hidden" style={{ background: gradientFor(course.title) }}>
          {course.thumbnail && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={course.thumbnail} alt="" loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
          )}
          <Badge className="absolute left-3 top-3 bg-white/90 text-slate-900 backdrop-blur hover:bg-white/90">{course.category}</Badge>
          {course.price === 0 && <Badge className="absolute right-3 top-3 bg-emerald-600 text-white">Free</Badge>}
        </div>
        <CardContent className="flex flex-1 flex-col gap-3 p-5">
          <p className="text-xs font-medium text-muted-foreground">{course.level}</p>
          <h3 className="line-clamp-2 text-lg font-semibold leading-snug">{course.title}</h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">{course.description}</p>
          <div className="mt-auto flex items-center justify-between border-t pt-3 text-sm">
            <span className="flex items-center gap-3 text-muted-foreground">
              <span className="flex items-center gap-1"><Clock className="size-3.5" />{course.duration}h</span>
              <span className="flex items-center gap-1"><Users className="size-3.5" />{(course.students ?? 0).toLocaleString("en-US")}</span>
            </span>
            <span className="font-semibold tabular-nums text-[#0F2A4A] dark:text-[#C9A24B]">{formatPrice(course.price)}</span>
          </div>
          <span className="flex items-center gap-1 text-sm font-medium text-[#0F2A4A] dark:text-[#C9A24B]">View program <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
        </CardContent>
      </Card>
    </Link>
  );
}
