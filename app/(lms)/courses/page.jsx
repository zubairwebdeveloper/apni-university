import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { courses, images } from "@/data/university";

export const metadata = { title: "Courses" };

export default function CoursesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Courses and programs</h1>
      <p className="mt-2 text-slate-600">Undergraduate and postgraduate degrees designed with industry input.</p>
      <Image src={images.study} alt="Student studying in the library" width={1200} height={500} className="mt-6 h-64 w-full rounded-xl object-cover" />
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => (
          <Card key={c.name}>
            <CardHeader><CardTitle>{c.name}</CardTitle></CardHeader>
            <CardContent className="text-sm text-slate-600">
              <p>{c.desc}</p>
              <p className="mt-2 font-medium text-slate-900">Duration: {c.duration}</p>
              <Link href="/contact" className={cn(buttonVariants({ size: "sm" }), "mt-4 bg-[#0F2A4A]")}>Ask about admission</Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
