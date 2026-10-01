"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils/cn";
import {
  NAV_FOOTER,
  getNavSections,
  isNavActive,
} from "@/lib/constants/Dashboardnav";

function NavItem({ item, pathname, onNavigate }) {
  const { label, href, icon: Icon, soon } = item;
  const base =
    "relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors";

  // Pages that aren't built yet: visible but not clickable, so nobody lands on a 404.
  if (soon) {
    return (
      <span
        aria-disabled="true"
        className={cn(base, "cursor-not-allowed text-muted-foreground/60")}
      >
        <Icon className="size-4" />
        {label}
        <Badge
          variant="outline"
          className="ml-auto px-1.5 py-0 text-[10px] font-normal"
        >
          Soon
        </Badge>
      </span>
    );
  }

  const active = isNavActive(pathname, href);
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        base,
        "group relative overflow-hidden transition-all duration-300 ease-out",
        active
          ? ["bg-primary/10 text-primary", "shadow-sm", "hover:bg-primary/15"]
          : [
              "text-muted-foreground",
              "hover:bg-accent",
              "hover:text-primary",
              "hover:shadow-sm",
              "hover:translate-x-0.5",
            ],
      )}
    >
      {/* Active indicator */}
      {active && (
        <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
      )}

      {/* Hover background effect */}
      <span
        className={cn(
          "absolute inset-0 -z-10 rounded-md opacity-0",
          "bg-gradient-to-r from-primary/10 via-primary/5 to-transparent",
          "transition-opacity duration-300",
          "group-hover:opacity-100",
        )}
      />

      {/* Icon */}
      <Icon
        className={cn(
          "size-4 shrink-0 transition-all duration-300 ease-out",
          active
            ? "text-primary"
            : "text-muted-foreground group-hover:text-primary group-hover:scale-110 group-hover:-rotate-3",
        )}
      />

      {/* Label */}
      <span
        className={cn(
          "transition-all duration-300",
          active
            ? "font-semibold"
            : "font-medium group-hover:translate-x-0.5 group-hover:font-semibold",
        )}
      >
        {label}
      </span>

      {/* Hover arrow */}
      {!active && (
        <span className="ml-auto translate-x-[-4px] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          →
        </span>
      )}
    </Link>
  );
}

export function SidebarNav({ role, onNavigate }) {
  const pathname = usePathname();
  const sections = getNavSections(role);

  return (
    <nav aria-label="Dashboard" className="flex flex-col gap-6 p-4">
      {sections.map((section, i) => (
        <div key={section.title} className="space-y-1">
          {i > 0 && (
            <p className="px-3 pb-1 text-lg font-bold uppercase tracking-wider text-black/70">
              {section.title}
            </p>
          )}
          {section.items.map((item) => (
            <NavItem
              key={item.href}
              item={item}
              pathname={pathname}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      ))}

      <div className="space-y-1 border-t pt-4">
        {NAV_FOOTER.map((item) => (
          <NavItem
            key={item.href}
            item={item}
            pathname={pathname}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </nav>
  );
}

// Desktop sidebar. Pass the signed-in user's role: <DashboardSidebar role={user.role} />
export function DashboardSidebar({ className, role = "student" }) {
  return (
    <aside
      className={cn(
        "hidden w-64 shrink-0 border-r bg-background md:block",
        className,
      )}
    >
      <div className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto">
        <SidebarNav role={role} />
      </div>
    </aside>
  );
}

// Mobile drawer: put the button in your dashboard top bar. Closes itself after navigating.
export function MobileSidebar({ className, role = "student" }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className={cn("md:hidden", className)}
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="size-4" />
      </Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-72 overflow-y-auto p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Dashboard menu</SheetTitle>
            <SheetDescription>
              Navigate between dashboard pages
            </SheetDescription>
          </SheetHeader>
          <SidebarNav role={role} onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
    </>
  );
}
