import { stats } from "@/data/home";
import CountUp from "./CountUp";
import { Reveal } from "./Reveal";

export default function StatsBand() {
  return (
    <section className="relative z-10 -mt-14 px-4 sm:px-6 lg:px-8">
      <Reveal className="mx-auto max-w-6xl">
        <dl className="grid grid-cols-2 divide-x divide-y rounded-2xl border bg-card shadow-xl lg:grid-cols-4 lg:divide-y-0">
          {stats.map((s) => (
            <div key={s.label} className="px-4 py-7 text-center">
              <dd className="font-serif text-3xl font-semibold tracking-tight text-[#0F2A4A] dark:text-white sm:text-4xl">
                <CountUp to={s.value} suffix={s.suffix} />
              </dd>
              <dt className="mt-1 text-sm text-muted-foreground">{s.label}</dt>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
