"use client";

import { cn } from "@/lib/utils/cn";

function getStrength(password = "") {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

const LABELS = ["Very weak", "Weak", "Fair", "Good", "Strong"];
const COLORS = ["bg-destructive", "bg-destructive", "bg-amber-500", "bg-amber-500", "bg-emerald-500"];

export function PasswordStrength({ password }) {
  const score = getStrength(password);
  if (!password) return null;

  return (
    <div className="space-y-1">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn("h-1.5 flex-1 rounded-full bg-muted", i < score && COLORS[score])}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground">{LABELS[score]}</p>
    </div>
  );
}
