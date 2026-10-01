"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import CourseForm from "@/components/courses/CourseForm";
import { courseService } from "@/lib/services/courseService";

export default function CreateCoursePage() {
  const router = useRouter();

  const onSubmit = async (values) => {
    await courseService.create(values);
    toast.success("Course created");
    router.push("/dashboard/courses");
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 sm:p-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">New course</h1>
        <p className="text-sm text-muted-foreground">Save as a draft first and publish when it's ready.</p>
      </header>
      <CourseForm onSubmit={onSubmit} submitLabel="Create course" />
    </div>
  );
}
