"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Clock, Pencil, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import CourseEmptyState from "@/components/courses/CourseEmptyState";
import CourseStatusBadge from "@/components/courses/CourseStatusBadge";
import { courseService } from "@/lib/services/courseService";
import { formatDate, formatPrice, gradientFor } from "@/lib/utils/course";
import Loading from "./loading";

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    courseService.get(courseId).then((c) => setCourse(c ?? null)).catch(setError);
  }, [courseId]);

  if (error) throw error; // handled by error.jsx
  if (course === undefined) return <Loading />;
  if (course === null) return <div className="p-8"><CourseEmptyState filtered onReset={() => history.back()} /></div>;

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 sm:p-8">
      <Button variant="ghost" size="sm" asChild><Link href="/dashboard/courses"><ArrowLeft className="size-4" /> All courses</Link></Button>

      <div className="aspect-[21/9] overflow-hidden rounded-xl" style={{ background: course.thumbnail ? `url(${course.thumbnail}) center/cover` : gradientFor(course.title) }} />

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <CourseStatusBadge status={course.status} />
          <h1 className="text-3xl font-semibold tracking-tight">{course.title}</h1>
          <p className="text-muted-foreground">{course.category} · {course.level} · Created {formatDate(course.createdAt)}</p>
        </div>
        <Button asChild><Link href={`/dashboard/courses/${course.id}/edit`}><Pencil className="size-4" /> Edit</Link></Button>
      </div>

      <div className="grid grid-cols-3 divide-x rounded-xl border bg-card text-center">
        <div className="p-4"><div className="text-xl font-semibold">{formatPrice(course.price)}</div><div className="text-xs text-muted-foreground">Price</div></div>
        <div className="p-4"><div className="flex items-center justify-center gap-1 text-xl font-semibold"><Clock className="size-4" />{course.duration}h</div><div className="text-xs text-muted-foreground">Duration</div></div>
        <div className="p-4"><div className="flex items-center justify-center gap-1 text-xl font-semibold"><Users className="size-4" />{course.students ?? 0}</div><div className="text-xs text-muted-foreground">Students</div></div>
      </div>

      <p className="max-w-prose whitespace-pre-line leading-relaxed">{course.description}</p>
      {course.tags?.length > 0 && <div className="flex flex-wrap gap-2">{course.tags.map((t) => <Badge key={t} variant="secondary">{t}</Badge>)}</div>}
    </div>
  );
}
