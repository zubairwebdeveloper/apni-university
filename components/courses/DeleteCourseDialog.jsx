"use client";

import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function DeleteCourseDialog({ ids, busy, onCancel, onConfirm }) {
  const n = ids?.length ?? 0;
  return (
    <AlertDialog open={n > 0} onOpenChange={(o) => !o && !busy && onCancel()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {n === 1 ? "this course" : `${n} courses`}?</AlertDialogTitle>
          <AlertDialogDescription>
            This permanently removes {n === 1 ? "the course" : "these courses"} and can't be undone. To keep the data, archive instead.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={busy}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={busy} onClick={(e) => { e.preventDefault(); onConfirm(ids); }}
            className="bg-destructive text-white hover:bg-destructive/90">
            {busy ? "Deleting…" : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
