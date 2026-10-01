"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertCircle, ChevronLeft, ChevronRight, LayoutGrid, List, Plus, RefreshCw, Search, SearchX, Trash2, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useResource } from "@/hooks/useResource";
import { resources } from "@/lib/resources";
import { opt } from "@/lib/resources/shared";
import ConfirmDelete from "./ConfirmDelete";
import ResourceCard from "./ResourceCard";
import ResourceStats from "./ResourceStats";
import ResourceTable from "./ResourceTable";

function Filter({ label, value, onChange, options, width = "w-[150px]" }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={width} aria-label={label}><SelectValue placeholder={label} /></SelectTrigger>
      <SelectContent>{options.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
    </Select>
  );
}

export default function ResourceListPage({ resource }) {
  const { config, service } = resources[resource];
  const r = useResource(config, service);
  const [view, setView] = useState("grid");
  const [toDelete, setToDelete] = useState([]);
  const Icon = config.icon;
  const actions = { onStatus: r.setStatus, onFeature: r.toggleFeatured, onDuplicate: r.duplicate, onDelete: setToDelete };
  const bulk = config.statusActions.filter((a) => a.bulk);

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{config.plural}</h1>
          <p className="text-sm text-muted-foreground">{config.blurb}</p>
        </div>
        <Link href={`${config.base}/create`} className={buttonVariants()}><Plus className="size-4" /> New {config.singular.toLowerCase()}</Link>
      </header>

      <ResourceStats config={config} stats={r.stats} />

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={r.search} onChange={(e) => r.setSearch(e.target.value)} placeholder={config.searchHint} className="pl-9 pr-9" aria-label={config.searchHint} />
          {r.search && (
            <button onClick={() => r.setSearch("")} className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground" aria-label="Clear search"><X className="size-4" /></button>
          )}
        </div>
        <Filter label="Status" value={r.filters.status} onChange={(v) => r.setFilter("status", v)}
          options={[{ value: "all", label: "All statuses" }, ...Object.entries(config.statuses).map(([value, m]) => ({ value, label: m.label }))]} />
        {config.filters.map((f) => (
          <Filter key={f.key} label={f.label} value={r.filters[f.key]} onChange={(v) => r.setFilter(f.key, v)}
            options={[{ value: "all", label: `All ${f.label.toLowerCase()}` }, ...opt(f.options)]} />
        ))}
        <Filter label="Sort" width="w-[170px]" value={r.filters.sort} onChange={(v) => r.setFilter("sort", v)}
          options={Object.entries(config.sorts).map(([value, s]) => ({ value, label: s.label }))} />
        {r.hasFilters && <Button variant="ghost" size="sm" onClick={r.reset}>Clear</Button>}

        <div className="ml-auto flex items-center gap-1">
          <Button variant="ghost" size="icon" className="size-8" onClick={r.refresh} aria-label="Refresh"><RefreshCw className={`size-4 ${r.loading ? "animate-spin" : ""}`} /></Button>
          <div className="flex rounded-lg border p-0.5">
            {[["grid", LayoutGrid], ["table", List]].map(([v, I]) => (
              <Button key={v} size="icon" variant={view === v ? "secondary" : "ghost"} className="size-8" onClick={() => setView(v)} aria-label={`${v} view`} aria-pressed={view === v}><I className="size-4" /></Button>
            ))}
          </div>
        </div>
      </div>

      {r.error ? (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Couldn't load {config.plural.toLowerCase()}</AlertTitle>
          <AlertDescription className="flex items-center justify-between gap-4">{r.error.message}<Button size="sm" variant="outline" onClick={r.retry}>Try again</Button></AlertDescription>
        </Alert>
      ) : r.loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-60 rounded-xl" />)}</div>
      ) : r.items.length === 0 ? (
        <div className="flex flex-col items-center rounded-xl border border-dashed py-16 text-center animate-in fade-in-0">
          <div className="mb-4 rounded-full bg-muted p-4">{r.hasFilters ? <SearchX className="size-6 text-muted-foreground" /> : <Icon className="size-6 text-muted-foreground" />}</div>
          <h3 className="text-lg font-semibold">{r.hasFilters ? `No ${config.plural.toLowerCase()} match these filters` : `No ${config.plural.toLowerCase()} yet`}</h3>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">{r.hasFilters ? "Try a different search or clear the filters." : `Add your first ${config.singular.toLowerCase()} to get started.`}</p>
          <div className="mt-5">
            {r.hasFilters
              ? <Button variant="outline" onClick={r.reset}>Clear filters</Button>
              : <Link href={`${config.base}/create`} className={buttonVariants()}>Create {config.singular.toLowerCase()}</Link>}
          </div>
        </div>
      ) : view === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {r.items.map((item, i) => (
            <ResourceCard key={item.id} config={config} item={item} index={i} selected={r.selected.includes(item.id)} onSelect={r.toggle} actions={actions} />
          ))}
        </div>
      ) : (
        <ResourceTable config={config} items={r.items} selected={r.selected} onSelect={r.toggle} onSelectAll={r.toggleAll} actions={actions} />
      )}

      {(r.page > 0 || r.hasNext) && (
        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-muted-foreground">Page {r.page + 1}</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={r.prev} disabled={r.page === 0 || r.loading}><ChevronLeft className="size-4" /> Previous</Button>
            <Button variant="outline" size="sm" onClick={r.next} disabled={!r.hasNext || r.loading}>Next <ChevronRight className="size-4" /></Button>
          </div>
        </div>
      )}

      {r.selected.length > 0 && (
        <div className="sticky bottom-4 z-10 mx-auto flex w-fit flex-wrap items-center justify-center gap-1 rounded-full border bg-background px-3 py-2 shadow-lg animate-in fade-in-0 slide-in-from-bottom-2">
          <span className="px-2 text-sm font-medium">{r.selected.length} selected</span>
          {bulk.map((a) => (
            <Button key={a.status} size="sm" variant="ghost" disabled={r.busy} onClick={() => r.bulkStatus(r.selected, a.status)}><a.icon className="size-4" /> {a.label}</Button>
          ))}
          <Button size="sm" variant="ghost" disabled={r.busy} onClick={() => setToDelete(r.selected)} className="text-destructive hover:text-destructive"><Trash2 className="size-4" /> Delete</Button>
          <Button size="icon" variant="ghost" className="size-8" onClick={r.clearSelection} aria-label="Clear selection"><X className="size-4" /></Button>
        </div>
      )}

      <ConfirmDelete config={config} ids={toDelete} busy={r.busy} onCancel={() => setToDelete([])}
        onConfirm={async (ids) => { if (await r.remove(ids)) setToDelete([]); }} />
    </div>
  );
}
