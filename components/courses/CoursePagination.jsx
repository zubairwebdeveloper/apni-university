"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CoursePagination({ page, hasNext, loading, onPrev, onNext }) {
  if (page === 0 && !hasNext) return null;
  return (
    <div className="flex items-center justify-between pt-2">
      <span className="text-sm text-muted-foreground">Page {page + 1}</span>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={onPrev} disabled={page === 0 || loading}><ChevronLeft className="size-4" /> Previous</Button>
        <Button variant="outline" size="sm" onClick={onNext} disabled={!hasNext || loading}>Next <ChevronRight className="size-4" /></Button>
      </div>
    </div>
  );
}
