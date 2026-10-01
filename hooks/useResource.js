"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

export function useResource(config, service) {
  const defaults = useMemo(
    () => ({
      status: "all",
      sort: Object.keys(config.sorts)[0],
      ...Object.fromEntries(config.filters.map((f) => [f.key, "all"])),
    }),
    [config]
  );
  const [filters, setFilters] = useState(defaults);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [data, setData] = useState({ items: [], hasNext: false });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [stats, setStats] = useState(null);
  const [busy, setBusy] = useState(false);
  const cursors = useRef([null]);
  const reqId = useRef(0);

  // Selection is derived so it can never include items that aren't on screen.
  const selected = useMemo(() => {
    const visible = new Set(data.items.map((i) => i.id));
    return selectedIds.filter((id) => visible.has(id));
  }, [selectedIds, data.items]);

  useEffect(() => {
    const t = setTimeout(() => setQuery(search), 350);
    return () => clearTimeout(t);
  }, [search]);

  const load = useCallback(async (p) => {
    const id = ++reqId.current;
    setLoading(true);
    setError(null);
    try {
      const res = await service.list({ filters, search: query, sort: filters.sort, cursor: cursors.current[p] ?? null });
      if (id !== reqId.current) return;
      if (res.items.length === 0 && p > 0) return load(p - 1);
      cursors.current[p + 1] = res.lastDoc;
      setData({ items: res.items, hasNext: res.hasNext });
      setPage(p);
    } catch (e) {
      if (id === reqId.current) setError(e);
    } finally {
      if (id === reqId.current) setLoading(false);
    }
  }, [filters, query, service]);

  const loadStats = useCallback(() => service.stats().then(setStats).catch(() => {}), [service]);

  useEffect(() => {
    cursors.current = [null];
    load(0);
  }, [load]);

  useEffect(() => { loadStats(); }, [loadStats]);

  const refresh = () => { load(page); loadStats(); };

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

  const label = (s) => config.statuses[s]?.label ?? s;

  return {
    items: data.items, hasNext: data.hasNext, loading, error, busy, page, stats, selected, filters, search,
    hasFilters: search !== "" || Object.entries(filters).some(([k, v]) => k !== "sort" && v !== defaults[k]),
    setFilter: (k, v) => setFilters((f) => ({ ...f, [k]: v })),
    setSearch,
    reset: () => { setFilters((f) => ({ ...defaults, sort: f.sort })); setSearch(""); },
    next: () => data.hasNext && load(page + 1),
    prev: () => page > 0 && load(page - 1),
    retry: () => load(page),
    refresh,
    toggle: (id) => setSelectedIds((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id])),
    toggleAll: () => setSelectedIds(selected.length === data.items.length ? [] : data.items.map((i) => i.id)),
    clearSelection: () => setSelectedIds([]),
    setStatus: (id, status) => run(() => service.setStatus(id, status), `Marked as ${label(status)}`),
    bulkStatus: (ids, status) => run(() => service.bulkStatus(ids, status), `${ids.length} items marked as ${label(status)}`),
    toggleFeatured: (item) =>
      run(() => service.setFeatured(item.id, !item.featured), item.featured ? "Removed from featured" : "Marked as featured"),
    duplicate: (id) => run(() => service.duplicate(id), "Duplicate created as a draft"),
    remove: (ids) =>
      run(() => (ids.length === 1 ? service.remove(ids[0]) : service.bulkRemove(ids)),
        ids.length === 1 ? "Deleted" : `${ids.length} items deleted`),
  };
}
