import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function LoadingSpinner({ className, size = 20 }) {
  return <Loader2 className={cn("animate-spin text-muted-foreground", className)} size={size} />;
}
