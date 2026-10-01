"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Loader2, Search, SearchX, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePublicCourses } from "@/hooks/usePublicCourses";
import { CATEGORIES, LEVELS, SORT_OPTIONS } from "@/lib/constants/course";
import PublicCourseCard, { CardSkeleton } from "./PublicCourseCard";

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`relative shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
        active ? "text-white" : "text-slate-600 hover:bg-slate-100"
      }`}
    >
      {active && <motion.span layoutId="category-pill" className="absolute inset-0 rounded-full bg-[#0F2A4A]" transition={{ type: "spring", stiffness: 500, damping: 38 }} />}
      <span className="relative">{children}</span>
    </button>
  );
}

export default function CoursesExplorer() {
  const c = usePublicCourses();

  return (
    <section className="mt-8 space-y-6">
      {/* category chips */}
      <div className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
        {["all", ...CATEGORIES].map((cat) => (
          <Chip key={cat} active={c.filters.category === cat} onClick={() => c.setFilter("category", cat)}>
            {cat === "all" ? "All programs" : cat}
          </Chip>
        ))}
      </div>

      {/* toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative w-full sm:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input value={c.search} onChange={(e) => c.setSearch(e.target.value)} placeholder="Search programs by title" className="pl-9 pr-9" aria-label="Search programs" />
          {c.search && (
            <button onClick={() => c.setSearch("")} className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 hover:text-slate-700" aria-label="Clear search">
              <X className="size-4" />
            </button>
          )}
        </div>

        <Select value={c.filters.level} onValueChange={(v) => c.setFilter("level", v)}>
          <SelectTrigger className="w-[150px]" aria-label="Level"><SelectValue placeholder="Level" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All levels</SelectItem>
            {LEVELS.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
          </SelectContent>
        </Select>

        <Select value={c.filters.sort} onValueChange={(v) => c.setFilter("sort", v)} disabled={!!c.search}>
          <SelectTrigger className="w-[180px]" aria-label="Sort"><SelectValue placeholder="Sort" /></SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
          </SelectContent>
        </Select>

        {c.hasFilters && <Button variant="ghost" size="sm" onClick={c.reset}>Clear all</Button>}
        {!c.loading && !c.error && (
          <p className="ml-auto text-sm text-slate-500" aria-live="polite">
            {c.items.length}{c.hasNext ? "+" : ""} {c.items.length === 1 ? "program" : "programs"}
          </p>
        )}
      </div>

      {/* results */}
      {c.error ? (
        <Alert variant="destructive">
          <AlertCircle className="size-4" />
          <AlertTitle>Couldn't load programs</AlertTitle>
          <AlertDescription className="flex items-center justify-between gap-4">
            {c.error.message}
            <Button size="sm" variant="outline" onClick={c.retry}>Try again</Button>
          </AlertDescription>
        </Alert>
      ) : c.loading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      ) : c.items.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center rounded-xl border border-dashed py-16 text-center">
          <div className="mb-4 rounded-full bg-slate-100 p-4"><SearchX className="size-6 text-slate-500" /></div>
          <h3 className="text-lg font-semibold">{c.hasFilters ? "No programs match your search" : "No programs are open yet"}</h3>
          <p className="mt-1 max-w-sm text-sm text-slate-600">
            {c.hasFilters ? "Try another keyword or clear the filters." : "New programs are added every semester. Check back soon."}
          </p>
          {c.hasFilters && <Button variant="outline" className="mt-5" onClick={c.reset}>Clear filters</Button>}
        </motion.div>
      ) : (
        <>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence initial>
              {c.items.map((course, i) => <PublicCourseCard key={course.id} course={course} index={i} />)}
            </AnimatePresence>
          </div>
          {c.hasNext && (
            <div className="flex justify-center pt-2">
              <Button variant="outline" size="lg" onClick={c.loadMore} disabled={c.loadingMore}>
                {c.loadingMore && <Loader2 className="size-4 animate-spin" />}
                {c.loadingMore ? "Loading…" : "Load more programs"}
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
