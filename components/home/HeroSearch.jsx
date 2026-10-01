"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HeroSearch({ popular = [] }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const go = (term) => router.push(term ? `/courses?q=${encodeURIComponent(term)}` : "/courses");

  return (
    <div>
      <form role="search" onSubmit={(e) => { e.preventDefault(); go(q.trim()); }} className="flex items-center gap-1 rounded-2xl bg-white p-1.5 shadow-xl ring-1 ring-white/20">
        <Search className="ml-3 size-5 shrink-0 text-slate-400" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="What do you want to study?"
          aria-label="Search programs"
          className="h-12 border-0 bg-transparent text-base text-slate-900 shadow-none placeholder:text-slate-500 focus-visible:ring-0"
        />
        <Button type="submit" size="lg" className="h-12 rounded-xl bg-[#C9A24B] px-6 text-[#0F2A4A] hover:bg-[#D9B45E]">Search</Button>
      </form>
      {popular.length > 0 && (
        <p className="mt-3 flex flex-wrap items-center gap-2 text-sm text-white/70">
          Popular:
          {popular.map((p) => (
            <button key={p} type="button" onClick={() => go(p)} className="rounded-full border border-white/20 px-3 py-1 text-white/90 transition-colors hover:bg-white/10">{p}</button>
          ))}
        </p>
      )}
    </div>
  );
}
