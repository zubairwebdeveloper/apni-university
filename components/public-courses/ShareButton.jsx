"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ShareButton({ title }) {
  const [done, setDone] = useState(false);

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title, url });
      else { await navigator.clipboard.writeText(url); setDone(true); setTimeout(() => setDone(false), 2000); }
    } catch { /* user cancelled */ }
  };

  return (
    <Button variant="outline" className="w-full" onClick={share}>
      {done ? <><Check className="size-4" /> Link copied</> : <><Share2 className="size-4" /> Share program</>}
    </Button>
  );
}
