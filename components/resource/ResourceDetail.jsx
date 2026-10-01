"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { AlertCircle, ArrowLeft, Pencil, Star } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { resources } from "@/lib/resources";
import { formatDate, gradientFor } from "@/lib/utils/course";
import StatusBadge from "./StatusBadge";
import Thumb from "./Thumb";

export default function ResourceDetail({ resource, id }) {
  const { config, service } = resources[resource];
  const [item, setItem] = useState();
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(() => service.get(id).then((i) => setItem(i ?? false)).catch(setError), [id, service]);
  useEffect(() => { load(); }, [load]);

  const act = async (fn, msg) => {
    setBusy(true);
    try { await fn(); toast.success(msg); await load(); } catch (e) { toast.error(e.message); } finally { setBusy(false); }
  };

  if (error) return <div className="p-8"><Alert variant="destructive"><AlertCircle className="size-4" /><AlertTitle>Couldn't load</AlertTitle><AlertDescription>{error.message}</AlertDescription></Alert></div>;
  if (item === undefined) return <div className="mx-auto max-w-4xl space-y-4 p-8"><Skeleton className="h-8 w-32" /><Skeleton className="h-40 rounded-xl" /><Skeleton className="h-32 rounded-xl" /></div>;
  if (item === false) return <div className="p-8"><Alert><AlertCircle className="size-4" /><AlertTitle>Not found</AlertTitle><AlertDescription>This {config.singular.toLowerCase()} may have been deleted.</AlertDescription></Alert></div>;

  const title = item[config.titleField];
  const image = config.imageField ? item[config.imageField] : "";
  const shape = config.imageShape ?? "none";

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 sm:p-8 animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
      <Link href={config.base} className={buttonVariants({ variant: "ghost", size: "sm" })}><ArrowLeft className="size-4" /> All {config.plural.toLowerCase()}</Link>

      {shape === "cover" && (
        <div className="aspect-[21/9] overflow-hidden rounded-xl" style={{ background: image ? `url(${image}) center/cover` : gradientFor(title) }} />
      )}

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          {shape === "avatar" && <Thumb title={title} image={image} round className="size-20" />}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <StatusBadge config={config} status={item.status} />
              {item.featured && <Badge variant="secondary" className="gap-1"><Star className="size-3 fill-amber-400 text-amber-400" /> Featured</Badge>}
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="text-muted-foreground">{config.subtitle?.(item)} · Added {formatDate(item.createdAt)}</p>
          </div>
        </div>
        <Link href={`${config.base}/${item.id}/edit`} className={buttonVariants()}><Pencil className="size-4" /> Edit</Link>
      </div>

      <div className="flex flex-wrap gap-2">
        {config.statusActions.filter((a) => a.status !== item.status).map((a) => (
          <Button key={a.status} variant="outline" size="sm" disabled={busy} onClick={() => act(() => service.setStatus(id, a.status), `Marked as ${config.statuses[a.status].label}`)}>
            <a.icon className="size-4" /> {a.label}
          </Button>
        ))}
        {config.featurable && (
          <Button variant="outline" size="sm" disabled={busy} onClick={() => act(() => service.setFeatured(id, !item.featured), item.featured ? "Removed from featured" : "Marked as featured")}>
            <Star className="size-4" /> {item.featured ? "Remove from featured" : "Mark as featured"}
          </Button>
        )}
      </div>

      {config.renderExtra && <div>{config.renderExtra(item, true)}</div>}

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {config.facts(item).map((f) => (
          <Card key={f.label} className="py-0"><CardContent className="p-4">
            <div className="text-xs text-muted-foreground">{f.label}</div>
            <div className="mt-1 break-words font-medium">{f.value || "—"}</div>
          </CardContent></Card>
        ))}
      </div>

      {config.detail(item).filter((s) => s.text || s.tags?.length || s.list?.length).map((s) => (
        <section key={s.title} className="space-y-2">
          <h2 className="font-semibold">{s.title}</h2>
          {s.text && <p className="max-w-prose whitespace-pre-line leading-relaxed text-muted-foreground">{s.text}</p>}
          {s.list?.length > 0 && <ul className="list-disc space-y-1 pl-5 text-muted-foreground">{s.list.map((l, i) => <li key={i}>{l}</li>)}</ul>}
          {s.tags?.length > 0 && <div className="flex flex-wrap gap-2">{s.tags.map((t) => <Badge key={t} variant="secondary">{t}</Badge>)}</div>}
        </section>
      ))}
    </div>
  );
}
