"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import CourseEmptyState from "@/components/courses/CourseEmptyState";
import CourseForm from "@/components/courses/CourseForm";
import { Skeleton } from "@/components/ui/skeleton";
import { courseService } from "@/lib/services/courseService";

export default function EditCoursePage() {
  const { courseId } = useParams();
  const router = useRouter();
  const [course, setCourse] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    courseService.get(courseId).then((c) => setCourse(c ?? null)).catch(setError);
  }, [courseId]);

  if (error) throw error;

  const onSubmit = async (values) => {
    await courseService.update(courseId, values);
    toast.success("Changes saved");
    router.push(`/dashboard/courses/${courseId}`);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 sm:p-8">
      <h1 className="text-2xl font-semibold tracking-tight">Edit course</h1>
      {course === undefined ? (
        <div className="space-y-4">{[1, 2, 3].map((i) => <Skeleton key={i} className="h-48 rounded-xl" />)}</div>
      ) : course === null ? (
        <CourseEmptyState filtered onReset={() => router.push("/dashboard/courses")} />
      ) : (
        <CourseForm
          defaultValues={{ ...course, tags: (course.tags ?? []).join(", ") }}
          onSubmit={onSubmit}
          submitLabel="Save changes"
        />
      )}
    </div>
  );
}
