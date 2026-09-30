import { LoadingSpinner } from "./LoadingSpinner";

export function PageLoader() {
  return (
    <div className="flex min-h-[50vh] w-full items-center justify-center">
      <LoadingSpinner size={28} />
    </div>
  );
}
