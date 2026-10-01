import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";
import { Reveal } from "./Reveal";

export default function ContactCta() {
  const c = siteConfig.contact;
  const info = [
    { icon: MapPin, label: "Visit us", value: c.address },
    { icon: Phone, label: "Call us", value: c.phone, href: `tel:${c.phone.replace(/\s/g, "")}` },
    { icon: Mail, label: "Email admissions", value: c.admissionsEmail, href: `mailto:${c.admissionsEmail}` },
    { icon: Clock, label: "Office hours", value: c.hours },
  ];

  return (
    <section id="contact" className="relative isolate overflow-hidden bg-[#0F2A4A] py-20 text-white sm:py-28">
      <div aria-hidden className="absolute inset-0 -z-10 opacity-[0.08] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div aria-hidden className="absolute -right-24 -top-24 -z-10 size-[26rem] rounded-full bg-[#C9A24B]/20 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-5xl">Ready to begin your <span className="italic text-[#C9A24B]">journey?</span></h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/75">Apply today or talk to our admissions team. We will help you choose the right program and answer every question.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/contact?topic=admissions" className={cn(buttonVariants({ size: "lg" }), "h-12 bg-[#C9A24B] px-8 text-[#0F2A4A] hover:bg-[#D9B45E]")}>Apply for admission <ArrowRight className="size-4" /></Link>
            <Link href="/courses" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-12 border-white/30 bg-transparent px-8 text-white hover:bg-white/10 hover:text-white")}>Explore programs</Link>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {info.map(({ icon: Icon, label, value, href }) => {
            const body = (
              <>
                <Icon className="size-5 text-[#C9A24B]" />
                <p className="mt-3 text-xs uppercase tracking-wider text-white/60">{label}</p>
                <p className="mt-1 text-sm font-medium">{value}</p>
              </>
            );
            const cls = "block rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm";
            return href ? <a key={label} href={href} className={`${cls} transition-colors hover:bg-white/10`}>{body}</a> : <div key={label} className={cls}>{body}</div>;
          })}
        </Reveal>
      </div>
    </section>
  );
}
