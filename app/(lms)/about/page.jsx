import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { images } from "@/data/university";

export const metadata = { title: "About | Apni University" };

const values = [
  { t: "Our mission", d: "To provide affordable, high-quality education that prepares students for real jobs and responsible citizenship." },
  { t: "Our vision", d: "To be the most trusted university for practical, career-focused learning in the region." },
  { t: "Our values", d: "Integrity, curiosity, teamwork and service to society." },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto mt-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">About Apni University</h1>
      <div className="mt-6 grid items-center gap-8 md:grid-cols-2">
        <p className="text-slate-600 ">
          Apni University was founded to give every student a fair chance at a great education. Our modern campus has
          smart classrooms, research labs, a digital library, sports facilities and a career center. Our faculty
          combines academic experience with industry practice.
        </p>
        <Image src={images.graduation} alt="Graduation day" width={1200} height={800} className="rounded-xl" />
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {values.map((v) => (
          <Card key={v.t}>
            <CardHeader><CardTitle>{v.t}</CardTitle></CardHeader>
            <CardContent className="text-sm text-slate-600">{v.d}</CardContent>
          </Card>
        ))}
      </div>
      <h2 className="mt-12 text-2xl font-bold">Campus facilities</h2>
      <ul className="mt-3 grid list-inside list-disc gap-1 text-slate-600 md:grid-cols-2">
        <li>Computer and engineering labs</li>
        <li>Digital library with 50,000+ resources</li>
        <li>Hostels for boys and girls</li>
        <li>Scholarships and financial aid</li>
        <li>Sports ground and gym</li>
        <li>Incubation and startup center</li>
      </ul>
    </div>
  );
}
