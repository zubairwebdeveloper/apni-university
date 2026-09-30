"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  TrendingUp,
  Award,
  Heart,
  Star,
  Bell,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

const NAV_ITEMS = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Courses", href: "/dashboard/courses", icon: BookOpen },
  { label: "Progress", href: "/dashboard/progress", icon: TrendingUp },
  { label: "Certificates", href: "/dashboard/certificates", icon: Award },
  { label: "Wishlist", href: "/dashboard/wishlist", icon: Heart },
  { label: "Reviews", href: "/dashboard/reviews", icon: Star },
  { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function DashboardSidebar({ className }) {
  const pathname = usePathname();

  return (
    <aside className={cn("hidden w-64 shrink-0 border-r bg-background md:block", className)}>
      <nav className="sticky top-16 flex flex-col gap-1 p-4">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
                active && "bg-accent text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
