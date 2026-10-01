"use client";

import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  GraduationCap,
  Menu,
  Sparkles,
} from "lucide-react";

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

/* ------------------------------------------------ */
/* Online animation                                 */
/* ------------------------------------------------ */

const STUDY_GIF =
  "https://fonts.gstatic.com/s/e/notoemoji/latest/1f4da/512.gif";

/* ------------------------------------------------ */
/* Role labels                                      */
/* ------------------------------------------------ */

const ROLE_LABEL = {
  student: "Student Portal",
  instructor: "Instructor Portal",
  editor: "Editor Console",
  admin: "Admin Console",
};

/* ------------------------------------------------ */
/* Navigation item                                  */
/* ------------------------------------------------ */

function NavItem({ item, pathname, onNavigate }) {
  const { label, href, icon: Icon, soon } = item;

  const base =
    "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300 ease-out";

  /* Not ready yet */
  if (soon) {
    return (
      <span
        aria-disabled="true"
        className={cn(base, "cursor-not-allowed text-muted-foreground/50")}
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted/50">
          <Icon className="size-4" />
        </span>

        <span className="flex-1 truncate">{label}</span>

        <Badge variant="outline" className="px-1.5 py-0 text-[9px] font-medium">
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
        active
          ? "bg-primary/10 text-primary shadow-sm"
          : [
              "text-muted-foreground",
              "hover:bg-accent",
              "hover:text-foreground",
              "hover:translate-x-0.5",
            ],
      )}
    >
      {/* Active indicator */}
      {active && (
        <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-primary" />
      )}

      {/* Icon */}
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-lg transition-all duration-300",
          active
            ? "bg-primary text-primary-foreground shadow-sm"
            : "bg-muted/60 group-hover:bg-primary/10",
        )}
      >
        <Icon
          className={cn(
            "size-4 transition-transform duration-300",
            !active && "group-hover:scale-110",
          )}
        />
      </span>

      {/* Label */}
      <span
        className={cn(
          "min-w-0 flex-1 truncate transition-all duration-300",
          active ? "font-semibold" : "font-medium group-hover:font-semibold",
        )}
      >
        {label}
      </span>

      {/* Arrow */}
      <ChevronRight
        className={cn(
          "size-4 shrink-0 opacity-0 transition-all duration-300",
          "group-hover:translate-x-0.5 group-hover:opacity-100",
          active && "text-primary opacity-100",
        )}
      />
    </Link>
  );
}

/* ------------------------------------------------ */
/* Sidebar navigation                               */
/* ------------------------------------------------ */

export function SidebarNav({ role, onNavigate }) {
  const pathname = usePathname();

  const sections = getNavSections(role);

  return (
    <nav aria-label="Dashboard navigation" className="flex flex-col gap-5">
      {sections.map((section, index) => (
        <div key={section.title} className="space-y-1">
          {/* Section heading */}
          {index > 0 && (
            <div className="mb-2 flex items-center gap-2 px-3 pt-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground/60">
                {section.title}
              </span>

              <span className="h-px flex-1 bg-border/60" />
            </div>
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

      {/* Footer navigation */}
      <div className="mt-1 space-y-1 border-t pt-4">
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

/* ------------------------------------------------ */
/* Learning promo card                              */
/* ------------------------------------------------ */

function LearningCard() {
  return (
    <div className="relative mt-5 overflow-hidden rounded-2xl border bg-card p-4 shadow-sm">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-6 -top-6 size-24 rounded-full bg-primary/10 blur-2xl" />

      <div className="relative">
        <div className="mb-3 flex items-center justify-between">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10">
            <BookOpen className="size-4 text-primary" />
          </span>

          <Sparkles className="size-4 text-primary/60" />
        </div>

        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold">Keep learning</p>

            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Continue your learning journey and build your skills.
            </p>
          </div>

          <Image
            src={STUDY_GIF}
            alt=""
            width={42}
            height={42}
            unoptimized
            className="size-10 shrink-0"
          />
        </div>

        <Link
          href="/courses"
          className="mt-4 flex items-center justify-between rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-all hover:bg-primary/90"
        >
          Explore Courses
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </div>
  );
}

/* ------------------------------------------------ */
/* Desktop sidebar                                  */
/* ------------------------------------------------ */

export function DashboardSidebar({ className, role = "student", user }) {
  const displayName = user?.name || user?.displayName || "";

  const avatar = user?.avatar || user?.photoURL || null;

  return (
    <aside
      className={cn(
        "hidden w-72 shrink-0 border-r bg-background md:block",
        className,
      )}
    >
      <div className="sticky top-0 flex h-screen flex-col">
        {/* Brand */}
        <div className="border-b px-5 py-4">
          <Link href="/" className="group flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#0F2A4A] text-[#C9A24B] shadow-sm transition-transform duration-300 group-hover:scale-105">
              <GraduationCap className="size-5" />
            </span>

            <div className="min-w-0">
              <p className="truncate font-serif text-base font-bold tracking-tight">
                Apni University
              </p>

              <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                {ROLE_LABEL[role] || "Dashboard"}
              </p>
            </div>
          </Link>
        </div>

        {/* User mini profile */}
        {user && (
          <div className="border-b px-4 py-4">
            <div className="flex items-center gap-3 rounded-xl bg-muted/40 p-3">
              {avatar ? (
                <Image
                  src={avatar}
                  alt={displayName}
                  width={40}
                  height={40}
                  className="size-10 rounded-full object-cover"
                />
              ) : (
                <div className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {(displayName || "U").charAt(0).toUpperCase()}
                </div>
              )}

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">
                  {displayName || "Welcome back"}
                </p>

                <p className="truncate text-xs text-muted-foreground">
                  {ROLE_LABEL[role] || "Dashboard"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 [scrollbar-width:thin]">
          <SidebarNav role={role} />

          <LearningCard />
        </div>

        {/* Bottom */}
        <div className="border-t px-4 py-3">
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-muted-foreground">Apni University</p>

            <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Online
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ------------------------------------------------ */
/* Mobile sidebar                                   */
/* ------------------------------------------------ */

export function MobileSidebar({ className, role = "student" }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className={cn("shrink-0 md:hidden", className)}
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

          {/* Mobile brand */}
          <div className="border-b px-5 py-4">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-[#0F2A4A] text-[#C9A24B]">
                <GraduationCap className="size-5" />
              </span>

              <div>
                <p className="font-serif text-base font-bold">
                  Apni University
                </p>

                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  {ROLE_LABEL[role] || "Dashboard"}
                </p>
              </div>
            </Link>
          </div>

          <div className="px-4 py-5">
            <SidebarNav role={role} onNavigate={() => setOpen(false)} />

            <LearningCard />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
