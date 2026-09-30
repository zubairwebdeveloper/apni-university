import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = { title: "Instructors" };

const instructors = [
  { name: "Dr. Ayesha Khan", role: "Computer Science", bio: "PhD in Machine Learning with 12 years of teaching and research experience." },
  { name: "Prof. Usman Ali", role: "Software Engineering", bio: "Former lead engineer who teaches web development and system design." },
  { name: "Dr. Sana Malik", role: "Data Science", bio: "Works on data analytics for healthcare and guides student research." },
  { name: "Mr. Hamza Raza", role: "Business Administration", bio: "Entrepreneur and mentor for the university startup center." },
];

export default function InstructorsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Our instructors</h1>
      <p className="mt-2 text-slate-600">Learn from teachers who have worked in the industry.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {instructors.map((i) => (
          <Card key={i.name}>
            <CardHeader className="flex-row items-center gap-3">
              <div aria-hidden className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0F2A4A] font-bold text-white">
                {i.name.split(" ").slice(-2).map((w) => w[0]).join("")}
              </div>
              <div>
                <CardTitle>{i.name}</CardTitle>
                <p className="text-sm text-slate-500">{i.role}</p>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">{i.bio}</CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
