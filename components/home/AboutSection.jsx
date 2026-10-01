import Link from "next/link";
import { ArrowRight, Check, Eye, Target } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { about, images } from "@/data/home";
import { cn } from "@/lib/utils/cn";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Reveal className="relative">
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-3 aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-br from-[#1B4474] to-[#0A1E36]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={images.campus} alt="The university campus" loading="lazy" className="size-full object-cover" />
            </div>
            <div className="col-span-2 mt-12 aspect-[3/5] overflow-hidden rounded-2xl bg-gradient-to-br from-[#C9A24B] to-[#8a6b22]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={images.study} alt="Students studying together" loading="lazy" className="size-full object-cover" />
            </div>
          </div>
          <div className="absolute -bottom-5 left-6 rounded-2xl border bg-card px-5 py-4 shadow-lg">
            <p className="font-serif text-2xl font-semibold text-[#0F2A4A] dark:text-white">Learn by doing</p>
            <p className="text-sm text-muted-foreground">Projects in every program</p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <SectionHeading
              eyebrow="About Apna University"
              title="A university built around your future."
              description="We combine rigorous teaching with practical experience, so graduates leave with knowledge, a portfolio and the confidence to use both."
            />
          </Reveal>

          <Stagger className="mt-8 grid gap-4 sm:grid-cols-2">
            {[{ icon: Target, title: "Our mission", text: about.mission }, { icon: Eye, title: "Our vision", text: about.vision }].map(({ icon: Icon, title, text }) => (
              <StaggerItem key={title}>
                <Card className="h-full py-0"><CardContent className="p-5">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-[#0F2A4A] text-[#C9A24B]"><Icon className="size-5" /></span>
                  <h3 className="mt-4 font-semibold">{title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{text}</p>
                </CardContent></Card>
              </StaggerItem>
            ))}
          </Stagger>

          <ul className="mt-8 space-y-3">
            {about.points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600"><Check className="size-3.5" /></span>
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-8 grid gap-4 border-t pt-8 sm:grid-cols-3">
            {about.values.map(({ icon: Icon, title, text }) => (
              <div key={title}>
                <Icon className="size-5 text-[#9A7A2E] dark:text-[#C9A24B]" />
                <h4 className="mt-2 font-semibold">{title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>

          <Link href="/about" className={cn(buttonVariants({ size: "lg" }), "mt-8 bg-[#0F2A4A] hover:bg-[#0F2A4A]/90")}>
            More about us <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
