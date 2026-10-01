"use client";

import { useState } from "react";
import { Star } from "lucide-react";

// Read-only when no onChange is given; otherwise an accessible radio group.
export default function StarRating({ value = 0, onChange, size = "size-4", id }) {
  const [hover, setHover] = useState(0);
  const interactive = typeof onChange === "function";
  const shown = hover || value;

  return (
    <div
      id={id}
      role={interactive ? "radiogroup" : "img"}
      aria-label={interactive ? "Rating" : `${value} out of 5 stars`}
      className="flex items-center gap-0.5"
      onMouseLeave={() => setHover(0)}
    >
      {[1, 2, 3, 4, 5].map((n) => {
        const star = (
          <Star className={`${size} transition-colors ${n <= shown ? "fill-amber-400 text-amber-400" : "text-slate-300 dark:text-slate-600"}`} />
        );
        return interactive ? (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} ${n === 1 ? "star" : "stars"}`}
            onMouseEnter={() => setHover(n)}
            onClick={() => onChange(n)}
            className="rounded p-0.5 transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {star}
          </button>
        ) : (
          <span key={n}>{star}</span>
        );
      })}
    </div>
  );
}
