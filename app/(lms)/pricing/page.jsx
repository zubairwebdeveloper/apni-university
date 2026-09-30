import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = { title: "Pricing" };

const plans = [
  { name: "Free", price: "Rs 0", features: ["Access to intro courses", "Community forum", "Course certificates not included"] },
  { name: "Student", price: "Rs 2,000 / month", features: ["All courses", "Live classes", "Certificates", "Career support"], highlight: true },
  { name: "Team", price: "Rs 10,000 / month", features: ["Up to 10 learners", "Progress reports", "Priority support"] },
];

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Pricing</h1>
      <p className="mt-2 text-slate-600">Simple plans. Scholarships are available for eligible students.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {plans.map((p) => (
          <Card key={p.name} className={p.highlight ? "border-2 border-[#F2A900]" : ""}>
            <CardHeader>
              <CardTitle>{p.name}</CardTitle>
              <p className="text-2xl font-bold text-[#0F2A4A]">{p.price}</p>
            </CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-1 text-sm text-slate-600">
                {p.features.map((f) => <li key={f}>{f}</li>)}
              </ul>
              <Link href="/contact" className={cn(buttonVariants(), "mt-4 w-full bg-[#0F2A4A]")}>Choose {p.name}</Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
