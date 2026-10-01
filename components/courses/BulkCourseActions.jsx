"use client";

import { Archive, Rocket, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BulkCourseActions({ selected, busy, onPublish, onArchive, onDelete, onClear }) {
  if (!selected.length) return null;
  return (
    <div className="sticky bottom-4 z-10 mx-auto flex w-fit items-center gap-1 rounded-full border bg-background px-3 py-2 shadow-lg">
      <span className="px-2 text-sm font-medium">{selected.length} selected</span>
      <Button size="sm" variant="ghost" disabled={busy} onClick={() => onPublish(selected)}><Rocket className="size-4" /> Publish</Button>
      <Button size="sm" variant="ghost" disabled={busy} onClick={() => onArchive(selected)}><Archive className="size-4" /> Archive</Button>
      <Button size="sm" variant="ghost" disabled={busy} onClick={() => onDelete(selected)} className="text-destructive hover:text-destructive"><Trash2 className="size-4" /> Delete</Button>
      <Button size="icon" variant="ghost" className="size-8" onClick={onClear} aria-label="Clear selection"><X className="size-4" /></Button>
    </div>
  );
}
