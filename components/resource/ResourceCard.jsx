"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { gradientFor } from "@/lib/utils/course";
import RowActions from "./RowActions";
import StatusBadge from "./StatusBadge";
import Thumb from "./Thumb";

export default function ResourceCard({ config, item, index, selected, onSelect, actions }) {
  const shape = config.imageShape ?? "none";
  const title = item[config.titleField];
  const image = config.imageField ? item[config.imageField] : "";
  const href = `${config.base}/${item.id}`;
  const body = config.bodyField ? item[config.bodyField] : null;
  const meta = (config.meta?.(item) ?? []).filter(Boolean);

  return (
    <Card
      className={`group gap-0 overflow-hidden py-0 transition-shadow animate-in fade-in-0 slide-in-from-bottom-2 duration-500 [animation-fill-mode:backwards] motion-reduce:animate-none hover:shadow-md ${selected ? "ring-2 ring-primary" : ""}`}
      style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
    >
      {shape === "cover" && (
        <Link href={href} className="block aspect-video overflow-hidden" tabIndex={-1} aria-hidden>
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt="" loading="lazy" className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
          ) : (
            <div className="flex size-full items-end p-4" style={{ background: gradientFor(title) }}>
              <span className="line-clamp-2 text-lg font-semibold text-white/90">{title}</span>
            </div>
          )}
        </Link>
      )}
      {shape === "avatar" && (
        <div className="flex justify-center bg-gradient-to-b from-muted/70 to-transparent pt-6">
          <Thumb title={title} image={image} round className="size-20 ring-4 ring-background" />
        </div>
      )}

      <CardContent className="space-y-3 p-4">
        <div className="flex items-center gap-2">
          <Checkbox checked={selected} onCheckedChange={() => onSelect(item.id)} aria-label={`Select ${title}`} />
          <StatusBadge config={config} status={item.status} />
          {item.featured && <Star className="size-4 fill-amber-400 text-amber-400" aria-label="Featured" />}
          <span className="ml-auto"><RowActions config={config} item={item} {...actions} /></span>
        </div>

        <div className={shape === "avatar" ? "text-center" : ""}>
          <Link href={href} className="line-clamp-1 font-semibold hover:underline">{title}</Link>
          <p className="line-clamp-1 text-sm text-muted-foreground">{config.subtitle?.(item)}</p>
        </div>

        {config.renderExtra?.(item)}
        {body && <p className="line-clamp-3 text-sm text-muted-foreground">{body}</p>}

        {meta.length > 0 && (
          <div className={`flex flex-wrap gap-x-4 gap-y-1 border-t pt-3 ${shape === "avatar" ? "justify-center" : ""}`}>
            {meta.map((m, i) => (
              <span key={i} className="flex items-center gap-1 text-xs text-muted-foreground"><m.icon className="size-3.5" />{m.text}</span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
