"use client";

import Link from "next/link";
import { Clock, Users } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { formatPrice, gradientFor } from "@/lib/utils/course";
import CourseActions from "./CourseActions";
import CourseStatusBadge from "./CourseStatusBadge";

export default function CourseCard({ course, selected, onSelect, ...actions }) {
  return (
    <article
      className={`group overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-md ${
        selected ? "ring-2 ring-primary" : ""
      }`}
    >
      <Link href={`/dashboard/courses/${course.id}`} className="relative block aspect-[16/9]">
        {course.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={course.thumbnail} alt="" className="size-full object-cover" />
        ) : (
          <div className="flex size-full items-end p-4" style={{ background: gradientFor(course.title) }}>
            <span className="line-clamp-2 text-lg font-semibold leading-tight text-white/90">{course.title}</span>
          </div>
        )}
      </Link>

      <div className="flex items-center justify-between px-4 pt-3">
        <div className="flex items-center gap-2">
          <Checkbox checked={selected} onCheckedChange={() => onSelect(course.id)} aria-label={`Select ${course.title}`} />
          <CourseStatusBadge status={course.status} />
        </div>
        <CourseActions course={course} {...actions} />
      </div>

      <div className="space-y-3 px-4 pb-4 pt-2">
        <div>
          <Link href={`/dashboard/courses/${course.id}`} className="line-clamp-1 font-semibold hover:underline">
            {course.title}
          </Link>
          <p className="text-sm text-muted-foreground">{course.category} · {course.level}</p>
        </div>
        <div className="flex items-center justify-between border-t pt-3 text-sm">
          <span className="flex items-center gap-3 text-muted-foreground">
            <span className="flex items-center gap-1"><Clock className="size-3.5" />{course.duration}h</span>
            <span className="flex items-center gap-1"><Users className="size-3.5" />{course.students ?? 0}</span>
          </span>
          <span className="font-semibold tabular-nums">{formatPrice(course.price)}</span>
        </div>
      </div>
    </article>
  );
}
