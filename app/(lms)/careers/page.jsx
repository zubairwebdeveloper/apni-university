import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { careers } from "@/data/university";

export const metadata = { title: "Careers" };

export default function CareersPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Career opportunities</h1>
      <p className="mt-2 text-slate-600">
        Our career center offers CV workshops, mock interviews, job fairs and internship placement.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {careers.map((c) => (
          <Card key={c.role}>
            <CardHeader><CardTitle>{c.role}</CardTitle></CardHeader>
            <CardContent className="text-sm text-slate-600">{c.note}</CardContent>
          </Card>
        ))}
      </div>
      <Link href="/contact" className={cn(buttonVariants({  }), "mt-8 bg-[#F2A900] text-[#0F2A4A] hover:bg-[#d99700]")}>Talk to our career counselor</Link>
    </div>
  );
}
