"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { courseService } from "@/lib/services/courseService";

const DEFAULT_FILTERS = {
  status: "all",
  category: "all",
  level: "all",
  sort: "newest",
};

export function useCourses() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [data, setData] = useState({ courses: [], hasNext: false });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [stats, setStats] = useState(null);
  const [busy, setBusy] = useState(false);
  const cursors = useRef([null]); // cursors[p] = startAfter doc for page p
  const reqId = useRef(0);

  // Selection is derived: only ids visible on the current page count as selected.
  // So page change / filter change / refetch can never leave "ghost" selections,
  // and no setState-inside-effect is needed to clear it.
  const selected = useMemo(() => {
    const visible = new Set(data.courses.map((c) => c.id));
    return selectedIds.filter((id) => visible.has(id));
  }, [selectedIds, data.courses]);

  // debounce search
  useEffect(() => {
    const t = setTimeout(() => setQuery(search), 350);
    return () => clearTimeout(t);
  }, [search]);

  const load = useCallback(
    async (p) => {
      const id = ++reqId.current;
      setLoading(true);
      setError(null);
      try {
        const res = await courseService.list({
          filters,
          search: query,
          cursor: cursors.current[p] ?? null,
        });
        if (id !== reqId.current) return; // stale response
        // last item on a page was removed → step back one page
        if (res.courses.length === 0 && p > 0) {
          cursors.current[p] = null;
          const previous = await courseService.list({
            filters,
            search: query,
            cursor: cursors.current[p - 1] ?? null,
          });
          if (id !== reqId.current) return;
          cursors.current[p] = previous.lastDoc;
          setData({ courses: previous.courses, hasNext: previous.hasNext });
          setPage(p - 1);
          return;
        }
        cursors.current[p + 1] = res.lastDoc;
        setData({ courses: res.courses, hasNext: res.hasNext });
        setPage(p);
      } catch (e) {
        if (id === reqId.current) setError(e);
      } finally {
        if (id === reqId.current) setLoading(false);
      }
    },
    [filters, query],
  );

  const loadStats = useCallback(
    () =>
      courseService
        .stats()
        .then(setStats)
        .catch(() => {}),
    [],
  );

  // any filter/search change → back to page 1
  useEffect(() => {
    cursors.current = [null];
    const frame = requestAnimationFrame(() => load(0));
    return () => cancelAnimationFrame(frame);
  }, [load]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  const refresh = () => {
    load(page);
    loadStats();
  };

  const run = async (fn, success) => {
    setBusy(true);
    try {
      await fn();
      toast.success(success);
      setSelectedIds([]);
      refresh();
      return true;
    } catch (e) {
      toast.error(e.message);
      return false;
    } finally {
      setBusy(false);
    }
  };

  const toggle = (id) =>
    setSelectedIds((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id],
    );

  const toggleAll = () =>
    setSelectedIds(
      selected.length === data.courses.length
        ? []
        : data.courses.map((c) => c.id),
    );

  return {
    ...data,
    loading,
    error,
    busy,
    page,
    stats,
    selected,
    filters,
    search,
    hasFilters:
      search !== "" ||
      Object.entries(filters).some(([k, v]) => v !== DEFAULT_FILTERS[k]),
    setFilter: (k, v) => setFilters((f) => ({ ...f, [k]: v })),
    setSearch,
    reset: () => {
      setFilters(DEFAULT_FILTERS);
      setSearch("");
    },
    next: () => data.hasNext && load(page + 1),
    prev: () => page > 0 && load(page - 1),
    retry: () => load(page),
    toggle,
    toggleAll,
    clearSelection: () => setSelectedIds([]),
    publish: (id) => run(() => courseService.publish(id), "Course published"),
    unpublish: (id) =>
      run(() => courseService.unpublish(id), "Moved to drafts"),
    archive: (id) => run(() => courseService.archive(id), "Course archived"),
    remove: (ids) =>
      run(
        () =>
          ids.length === 1
            ? courseService.remove(ids[0])
            : courseService.bulkDelete(ids),
        ids.length === 1 ? "Course deleted" : `${ids.length} courses deleted`,
      ),
    bulkPublish: (ids) =>
      run(
        () => courseService.bulkPublish(ids),
        `${ids.length} courses published`,
      ),
    bulkArchive: (ids) =>
      run(
        () => courseService.bulkArchive(ids),
        `${ids.length} courses archived`,
      ),
  };
}
