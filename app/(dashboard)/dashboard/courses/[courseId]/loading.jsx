import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 sm:p-8">
      <Skeleton className="h-8 w-28" />
      <Skeleton className="aspect-[21/9] w-full rounded-xl" />
      <Skeleton className="h-9 w-2/3" />
      <Skeleton className="h-20 w-full rounded-xl" />
      <Skeleton className="h-32 w-full" />
    </div>
  );
}
