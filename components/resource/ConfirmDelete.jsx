"use client";

import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ConfirmDelete({ config, ids, busy, onCancel, onConfirm }) {
  const n = ids?.length ?? 0;
  const noun = config.singular.toLowerCase();
  return (
    <AlertDialog open={n > 0} onOpenChange={(o) => !o && !busy && onCancel()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {n === 1 ? `this ${noun}` : `${n} ${config.plural.toLowerCase()}`}?</AlertDialogTitle>
          <AlertDialogDescription>This permanently removes the data and can't be undone. If you only want to hide it, archive it instead.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={busy}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={busy} onClick={(e) => { e.preventDefault(); onConfirm(ids); }} className="bg-destructive text-white hover:bg-destructive/90">
            {busy ? "Deleting…" : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
