"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertCircle, LayoutGrid, List, Plus } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import BulkCourseActions from "@/components/courses/BulkCourseActions";
import CourseCard from "@/components/courses/CourseCard";
import CourseEmptyState from "@/components/courses/CourseEmptyState";
import CourseFilters from "@/components/courses/CourseFilters";
import CoursePagination from "@/components/courses/CoursePagination";
import CourseSearch from "@/components/courses/CourseSearch";
import CourseStats from "@/components/courses/CourseStats";
import CourseTable from "@/components/courses/CourseTable";
import DeleteCourseDialog from "@/components/courses/DeleteCourseDialog";
import { useCourses } from "@/hooks/useCourses";

export default function CoursesPage() {
  const c = useCourses();
  const [view, setView] = useState("grid");
  const [toDelete, setToDelete] = useState([]);

  const actions = {
    onPublish: c.publish, onUnpublish: c.unpublish, onArchive: c.archive, onDelete: setToDelete,
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Courses</h1>
          <p className="text-sm text-muted-foreground">Create, publish and manage everything you teach.</p>
        </div>
        <Button asChild><Link href="/dashboard/courses/create"><Plus className="size-4" /> New course</Link></Button>
      </header>

      <CourseStats stats={c.stats} />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-1 flex-wrap items-center gap-2">
          <CourseSearch value={c.search} onChange={c.setSearch} />
          <CourseFilters filters={c.filters} onChange={c.setFilter} />
        </div>
        <div className="flex rounded-lg border p-0.5">
          {[["grid", LayoutGrid], ["table", List]].map(([v, Icon]) => (
            <Button key={v} size="icon" variant={view === v ? "secondary" : "ghost"} className="size-8"
              onClick={() => setView(v)} aria-label={`${v} view`} aria-pressed={view === v}>
              <Icon className="size-4" />
            </Button>
          ))}
        </div>
      </div>

      {c.error ? (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Couldn&apos;t load courses</AlertTitle>
          <AlertDescription className="flex items-center justify-between gap-4">
            {c.error.message}
            <Button size="sm" variant="outline" onClick={c.retry}>Try again</Button>
          </AlertDescription>
        </Alert>
      ) : c.loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-64 rounded-xl" />)}
        </div>
      ) : c.courses.length === 0 ? (
        <CourseEmptyState filtered={c.hasFilters} onReset={c.reset} />
      ) : view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {c.courses.map((course) => (
            <CourseCard key={course.id} course={course} selected={c.selected.includes(course.id)} onSelect={c.toggle} {...actions} />
          ))}
        </div>
      ) : (
        <CourseTable courses={c.courses} selected={c.selected} onSelect={c.toggle} onSelectAll={c.toggleAll} {...actions} />
      )}

      <CoursePagination page={c.page} hasNext={c.hasNext} loading={c.loading} onPrev={c.prev} onNext={c.next} />

      <BulkCourseActions selected={c.selected} busy={c.busy} onPublish={c.bulkPublish} onArchive={c.bulkArchive}
        onDelete={setToDelete} onClear={c.clearSelection} />

      <DeleteCourseDialog ids={toDelete} busy={c.busy} onCancel={() => setToDelete([])}
        onConfirm={async (ids) => { if (await c.remove(ids)) setToDelete([]); }} />
    </div>
  );
}
