"use client";

import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-center">
      <AlertCircle className="size-8 text-destructive" />
      <h2 className="text-lg font-semibold">This page failed to load</h2>
      <p className="max-w-sm text-sm text-muted-foreground">{error.message || "An unexpected error occurred."}</p>
      <Button onClick={reset}>Reload page</Button>
    </div>
  );
}
