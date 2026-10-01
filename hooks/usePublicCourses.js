"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { courseService } from "@/lib/services/courseService";

const DEFAULTS = { category: "all", level: "all", sort: "newest" };

// Public-facing list: only ever asks Firestore for status == "published".
export function usePublicCourses() {
  const [filters, setFilters] = useState(DEFAULTS);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [hasNext, setHasNext] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const cursor = useRef(null);
  const reqId = useRef(0);

  useEffect(() => {
    const t = setTimeout(() => setQuery(search.trim()), 350);
    return () => clearTimeout(t);
  }, [search]);

  const fetchPage = useCallback(async (append) => {
    const id = ++reqId.current;
    if (append) setLoadingMore(true);
    else { setLoading(true); setLoadingMore(false); }
    setError(null);
    try {
      const res = await courseService.list({
        filters: { ...filters, status: "published" },
        search: query,
        cursor: append ? cursor.current : null,
      });
      if (id !== reqId.current) return; // stale response
      cursor.current = res.lastDoc;
      setItems((prev) => (append ? [...prev, ...res.courses] : res.courses));
      setHasNext(res.hasNext);
    } catch (e) {
      if (id === reqId.current) setError(e);
    } finally {
      if (id === reqId.current) { setLoading(false); setLoadingMore(false); }
    }
  }, [filters, query]);

  useEffect(() => {
    cursor.current = null;
    const id = ++reqId.current;
    const timer = setTimeout(() => {
      if (id === reqId.current) fetchPage(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchPage]);

  return {
    items, hasNext, loading, loadingMore, error, filters, search,
    hasFilters: search !== "" || Object.entries(filters).some(([k, v]) => v !== DEFAULTS[k]),
    setFilter: (k, v) => setFilters((f) => ({ ...f, [k]: v })),
    setSearch,
    reset: () => { setFilters(DEFAULTS); setSearch(""); },
    loadMore: () => hasNext && !loadingMore && fetchPage(true),
    retry: () => fetchPage(false),
  };
}
