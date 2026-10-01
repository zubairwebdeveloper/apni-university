import Link from "next/link";
import { ArrowRight, CheckCircle2, GraduationCap, Star } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { images, popularSearches } from "@/data/home";
import { cn } from "@/lib/utils/cn";
import HeroSearch from "./HeroSearch";
import { Reveal } from "./Reveal";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0F2A4A] pb-28 pt-16 text-white sm:pt-20 lg:pb-36">
      {/* decorative grid + glow */}
      <div aria-hidden className="absolute inset-0 -z-10 opacity-[0.10] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_72%)]" />
      <div aria-hidden className="absolute -right-24 -top-28 -z-10 size-[30rem] rounded-full bg-[#C9A24B]/20 blur-3xl" />
      <div aria-hidden className="absolute -bottom-40 -left-24 -z-10 size-[26rem] rounded-full bg-sky-400/10 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-white/90">
              <GraduationCap className="size-4 text-[#C9A24B]" /> Spring 2027 admissions open
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 font-serif text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Where ambition <span className="italic text-[#C9A24B]">becomes a career.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/75">
              Apna University offers industry-focused degrees and short courses, taught by working professionals, with the support you need from your first day to your first job.
            </p>
          </Reveal>
          <Reveal delay={0.24} className="mt-8 max-w-xl">
            <HeroSearch popular={popularSearches} />
          </Reveal>
          <Reveal delay={0.32}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact?topic=admissions" className={cn(buttonVariants({ size: "lg" }), "h-12 bg-[#C9A24B] px-7 text-[#0F2A4A] hover:bg-[#D9B45E]")}>
                Apply for admission <ArrowRight className="size-4" />
              </Link>
              <Link href="/courses" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12 border-white/30 bg-transparent px-7 text-white hover:bg-white/10 hover:text-white")}>
                Explore programs
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/70">
              {["Accredited programs", "Scholarships available", "Career support"].map((t) => (
                <li key={t} className="flex items-center gap-2"><CheckCircle2 className="size-4 text-[#C9A24B]" />{t}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* image collage */}
        <Reveal delay={0.2} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-[#1B4474] to-[#0A1E36] shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={images.hero} alt="Students collaborating on campus" fetchPriority="high" className="size-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F2A4A]/60 via-transparent to-transparent" />
          </div>
          <div className="absolute -left-3 bottom-10 flex items-center gap-3 rounded-2xl bg-white p-4 text-slate-900 shadow-xl sm:-left-8">
            <span className="flex size-11 items-center justify-center rounded-xl bg-[#0F2A4A]/10"><Star className="size-5 fill-[#C9A24B] text-[#C9A24B]" /></span>
            <span><span className="block text-xl font-bold leading-none">4.9 / 5</span><span className="text-xs text-slate-500">Average student rating</span></span>
          </div>
          <div className="absolute -right-2 top-8 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-medium text-slate-900 shadow-lg sm:-right-6">
            <span className="relative flex size-2.5"><span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-70 motion-reduce:animate-none" /><span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" /></span>
            Admissions open
          </div>
        </Reveal>
      </div>
    </section>
  );
}
