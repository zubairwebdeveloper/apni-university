import { facilities, gallery } from "@/data/home";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function CampusSection() {
  return (
    <section id="campus" className="border-y bg-muted/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal><SectionHeading eyebrow="Campus life" title="Everything you need to learn, grow and belong." description="Modern facilities and a supportive community, designed around the student experience." /></Reveal>

        <Stagger className="mt-10 grid auto-rows-[11rem] gap-3 sm:grid-cols-4" gap={0.07}>
          {gallery.map((g) => (
            <StaggerItem key={g.src} className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1B4474] to-[#0A1E36] ${g.span}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={g.src} alt={g.alt} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-sm font-medium text-white">{g.alt}</span>
            </StaggerItem>
          ))}
        </Stagger>

        <Stagger className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4" gap={0.05}>
          {facilities.map(({ icon: Icon, title, text }) => (
            <StaggerItem key={title}>
              <div className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#0F2A4A] text-[#C9A24B]"><Icon className="size-5" /></span>
                <div><h3 className="font-semibold">{title}</h3><p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p></div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
