import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AnnouncementBar() {
  return (
    <div className="bg-[#C9A24B] text-[#0F2A4A]">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center text-sm font-medium">
        <span>Admissions are open for Spring 2027.</span>
        <Link href="/contact?topic=admissions" className="inline-flex items-center gap-1 font-semibold underline-offset-4 hover:underline">
          Apply now <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </div>
  );
}
