import Link from "next/link";
import { BookOpen, SearchX } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

export default function CourseEmptyState({ filtered, onReset }) {
  const Icon = filtered ? SearchX : BookOpen;
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed py-16 text-center">
      <div className="mb-4 rounded-full bg-muted p-4"><Icon className="size-6 text-muted-foreground" /></div>
      <h3 className="text-lg font-semibold">{filtered ? "No courses match these filters" : "You haven't created a course yet"}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">
        {filtered ? "Try a different search term or clear the filters." : "Create your first course to start enrolling students."}
      </p>
      <div className="mt-5">
        {filtered ? <Button variant="outline" onClick={onReset}>Clear filters</Button>
          : <Link href="/dashboard/courses/create" className={buttonVariants()}>Create course</Link>}
      </div>
    </div>
  );
}
