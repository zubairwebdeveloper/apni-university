import Link from "next/link";
import { ArrowRight, Briefcase, GraduationCap } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { Reveal, Stagger, StaggerItem } from "./Reveal";

const items = [
  { icon: Briefcase, title: "Join our team", text: "We are always looking for teachers, advisors and staff who care about students.", href: "/careers", cta: "See open positions" },
  { icon: GraduationCap, title: "Teach with us", text: "Share your expertise, build your audience and shape the next generation of professionals.", href: "/contact?topic=instructor", cta: "Become an instructor" },
];

export default function CareersBand() {
  return (
    <section className="py-20 sm:py-24">
      <Stagger className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
        {items.map(({ icon: Icon, title, text, href, cta }) => (
          <StaggerItem key={title}>
            <div className="relative h-full overflow-hidden rounded-2xl border bg-card p-8 transition-shadow hover:shadow-lg sm:p-10">
              <Icon aria-hidden className="absolute -right-4 -top-4 size-36 text-[#C9A24B]/10" />
              <span className="flex size-12 items-center justify-center rounded-xl bg-[#0F2A4A] text-[#C9A24B]"><Icon className="size-6" /></span>
              <h3 className="mt-5 font-serif text-2xl font-semibold">{title}</h3>
              <p className="mt-2 max-w-md leading-7 text-muted-foreground">{text}</p>
              <Link href={href} className={cn(buttonVariants({ size: "lg" }), "mt-6 bg-[#0F2A4A] hover:bg-[#0F2A4A]/90")}>{cta} <ArrowRight className="size-4" /></Link>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
