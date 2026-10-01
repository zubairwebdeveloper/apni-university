"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

// Server renders the final number (good for SEO / no-JS); counts up when scrolled into view.
export default function CountUp({ to, suffix = "", duration = 1400 }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [n, setN] = useState(to);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    let raf;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0) / duration, 1);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, duration, reduce]);

  return <span ref={ref}>{n.toLocaleString("en-US")}{suffix}</span>;
}
