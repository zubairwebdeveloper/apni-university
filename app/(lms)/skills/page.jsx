import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { skills } from "@/data/university";

export const metadata = { title: "Skills | Apni University" };

export default function SkillsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Skills you will build</h1>
      <p className="mt-2 text-slate-600">Technical and professional skills that employers ask for.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {skills.map((s) => (
          <Card key={s.title}>
            <CardHeader><CardTitle>{s.title}</CardTitle></CardHeader>
            <CardContent>
              <ul className="list-inside list-disc space-y-1 text-sm text-slate-600">
                {s.items.map((i) => <li key={i}>{i}</li>)}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
