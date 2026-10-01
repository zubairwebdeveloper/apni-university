"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useReducedMotion } from "framer-motion";

import {
  Bell,
  BellOff,
  GraduationCap,
  LogOut,
  Settings,
  Globe,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { siteConfig } from "@/config/site";

import {
  NAV_FOOTER,
  findNavItem,
  getNavSections,
  isNavActive,
} from "@/lib/constants/Dashboardnav";

import { cn } from "@/lib/utils/cn";
import { gradientFor } from "@/lib/utils/course";
import { initials } from "@/lib/utils/text";
import { MobileSidebar } from "./DashboardSidebar";

/* Animated waving hand */
const WAVE_GIF = "https://fonts.gstatic.com/s/e/notoemoji/latest/1f44b/512.gif";

const ROLE_LABEL = {
  student: "Student portal",
  instructor: "Instructor portal",
  editor: "Editor console",
  admin: "Admin console",
};

/* ---------------------------------- */
/* Wave                                */
/* ---------------------------------- */

function Wave() {
  const reduce = useReducedMotion();
  const ref = useRef(null);

  const [state, setState] = useState("pending");

  useEffect(() => {
    const el = ref.current;

    if (el?.complete) {
      setState(el.naturalWidth > 0 ? "ok" : "fail");
    }
  }, []);

  const showEmoji = reduce || state !== "ok";

  return (
    <span
      className="relative inline-flex size-6 shrink-0 items-center justify-center"
      aria-hidden="true"
    >
      {showEmoji && <span className="text-lg leading-none">👋</span>}

      {!reduce && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={ref}
          src={WAVE_GIF}
          alt=""
          width={24}
          height={24}
          onLoad={() => setState("ok")}
          onError={() => setState("fail")}
          className={cn(
            "absolute inset-0 size-6",
            state === "ok" ? "opacity-100" : "opacity-0",
          )}
        />
      )}
    </span>
  );
}

/* ---------------------------------- */
/* Greeting                            */
/* ---------------------------------- */

function greeting(hour) {
  if (hour < 5) return "Burning the midnight oil";
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";

  return "Good evening";
}

/* ---------------------------------- */
/* Avatar                              */
/* ---------------------------------- */

function Avatar({ user, className = "size-9" }) {
  const name = user?.name || user?.displayName || "User";
  const avatar = user?.avatar || user?.photoURL;

  if (avatar) {
    return (
      <Image
        src={avatar}
        alt={name}
        width={40}
        height={40}
        className={cn("rounded-full object-cover", className)}
      />
    );
  }

  return (
    <span
      className={cn(
        "flex items-center justify-center rounded-full text-xs font-semibold text-white",
        className,
      )}
      style={{
        background: gradientFor(name),
      }}
    >
      {initials(name)}
    </span>
  );
}

/* ---------------------------------- */
/* Notifications                       */
/* ---------------------------------- */

function NotificationsMenu({ items = [] }) {
  const router = useRouter();

  const unread = items.filter((item) => !item.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({
            variant: "ghost",
            size: "icon",
          }),
          "relative",
        )}
        aria-label={
          unread ? `Notifications, ${unread} unread` : "Notifications"
        }
      >
        <Bell className="size-5" />

        {unread > 0 && (
          <span className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold leading-none text-white ring-2 ring-background">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-[min(20rem,calc(100vw-2rem))]"
      >
        {/* Notifications Header */}
        <div className="flex items-center justify-between px-3 py-2">
          <p className="text-sm font-semibold">Notifications</p>

          {unread > 0 && (
            <span className="text-xs text-muted-foreground">{unread} new</span>
          )}
        </div>

        <DropdownMenuSeparator />

        {/* Empty State */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-2 px-4 py-8 text-center text-sm text-muted-foreground">
            <BellOff className="size-6" />

            <span>You&apos;re all caught up.</span>
          </div>
        ) : (
          items.slice(0, 5).map((notification, index) => (
            <DropdownMenuItem
              key={notification.id ?? index}
              onClick={() =>
                notification.href && router.push(notification.href)
              }
              className="items-start gap-3 py-2.5"
            >
              <span
                className={cn(
                  "mt-1.5 size-2 shrink-0 rounded-full",
                  notification.read ? "bg-transparent" : "bg-sky-500",
                )}
              />

              <span className="min-w-0">
                <span className="block truncate text-sm font-medium">
                  {notification.title}
                </span>

                {notification.text && (
                  <span className="line-clamp-2 text-xs text-muted-foreground">
                    {notification.text}
                  </span>
                )}

                {notification.time && (
                  <span className="mt-0.5 block text-[11px] text-muted-foreground/70">
                    {notification.time}
                  </span>
                )}
              </span>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ---------------------------------- */
/* User Menu                           */
/* ---------------------------------- */

function UserMenu({ user, onLogout, logoutHref = "/login" }) {
  const router = useRouter();

  const displayName = user?.name || user?.displayName || "User";

  const displayEmail = user?.email || "";

  const firebaseUser = {
    ...user,
    name: displayName,
    avatar: user?.avatar || user?.photoURL || null,
  };

  return (
    <DropdownMenu>
      {/* Avatar Button */}
      <DropdownMenuTrigger
        className={cn(
          "rounded-full outline-none",
          "focus-visible:ring-2",
          "focus-visible:ring-ring",
          "focus-visible:ring-offset-2",
        )}
        aria-label="Open user menu"
      >
        <Avatar user={firebaseUser} className="size-9" />
      </DropdownMenuTrigger>

      {/* Menu */}
      <DropdownMenuContent align="end" sideOffset={8} className="w-64">
        {/* User Information */}
        <div className="flex items-center gap-3 px-3 py-3">
          <Avatar user={firebaseUser} className="size-10 shrink-0" />

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{displayName}</p>

            {displayEmail && (
              <p className="truncate text-xs text-muted-foreground">
                {displayEmail}
              </p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* Dashboard */}
        <DropdownMenuItem onClick={() => router.push("/dashboard")}>
          <GraduationCap className="size-4" />
          Dashboard
        </DropdownMenuItem>

        {/* Courses */}
        <DropdownMenuItem onClick={() => router.push("/courses")}>
          <GraduationCap className="size-4" />
          My Courses
        </DropdownMenuItem>

        {/* Website */}
        <DropdownMenuItem onClick={() => router.push("/")}>
          <Globe className="size-4" />
          Visit Website
        </DropdownMenuItem>

        {/* Settings */}
        <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
          <Settings className="size-4" />
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={() => {
            if (onLogout) {
              onLogout();
            } else {
              router.push(logoutHref);
            }
          }}
        >
          <LogOut className="size-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ---------------------------------- */
/* Mobile Header                       */
/* ---------------------------------- */

export default function MobileHeader({
  role = "student",
  user = null,
  notifications = [],
  streak = 0,
  onLogout,
  logoutHref = "/login",
}) {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);

  const [hello] = useState(() => greeting(new Date().getHours()));

  /* Scroll detection */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* User name */
  const firstName =
    user?.name?.split(" ")[0] || user?.displayName?.split(" ")[0] || "there";

  /* Current page */
  const pageTitle = findNavItem(pathname, role)?.label || "Dashboard";

  /* Quick links */
  const chips = [
    ...getNavSections(role).flatMap((section) => section.items),
    ...NAV_FOOTER,
  ]
    .filter((item) => !item.soon)
    .filter(
      (item, index, array) =>
        array.findIndex((x) => x.href === item.href) === index,
    );

  return (
    <header className="sticky top-0 z-40 md:hidden">
      <div
        className={cn(
          "border-b bg-background/85 pt-[env(safe-area-inset-top)] backdrop-blur-xl transition-shadow duration-300",
          scrolled && "shadow-sm",
        )}
      >
        {/* Row 1 */}
        <div className="flex h-14 items-center gap-2 px-3">
          <MobileSidebar role={role} />

          {/* Brand */}
          <Link
            href="/"
            className="flex min-w-0 flex-1 items-center gap-2.5"
            aria-label={`${siteConfig.name} home`}
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#0F2A4A] text-[#C9A24B] shadow-sm">
              <GraduationCap className="size-5" />
            </span>

            <span className="min-w-0 leading-tight">
              <span className="block truncate font-serif text-[15px] font-semibold tracking-tight">
                {siteConfig.name}
              </span>

              <span className="block truncate text-[11px] text-muted-foreground">
                {scrolled ? pageTitle : ROLE_LABEL[role] || "Dashboard"}
              </span>
            </span>
          </Link>

          {/* Notifications */}
          <NotificationsMenu items={notifications} />

          {/* Firebase User */}
          {user && (
            <UserMenu user={user} onLogout={onLogout} logoutHref={logoutHref} />
          )}
        </div>

        {/* Row 2 */}
        <div
          className={cn(
            "grid transition-[grid-template-rows] duration-300 ease-out",
            scrolled ? "grid-rows-[0fr]" : "grid-rows-[1fr]",
          )}
        >
          <div className="overflow-hidden">
            {/* Greeting */}
            <div className="flex items-center justify-between gap-3 px-4 pb-2">
              <p className="flex min-w-0 items-center gap-1.5 text-sm font-medium">
                <Wave />

                <span className="truncate">
                  {hello}, {firstName}
                </span>
              </p>

              {streak > 0 && (
                <span className="flex shrink-0 items-center gap-1 rounded-full border border-orange-500/30 bg-orange-500/10 px-2.5 py-0.5 text-xs font-medium text-orange-600 dark:text-orange-400">
                  <span aria-hidden="true">🔥</span>
                  {streak}-day streak
                </span>
              )}
            </div>

            {/* Quick Links */}
            {chips.length > 0 && (
              <nav
                aria-label="Quick links"
                className="flex flex-wrap gap-2 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {chips.map(({ href, label, icon: Icon }) => {
                  const active = isNavActive(pathname, href);

                  return (
                    <Link
                      key={href}
                      href={href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                        active
                          ? "border-[#0F2A4A] bg-[#0F2A4A] text-white"
                          : "bg-card text-muted-foreground hover:bg-accent hover:text-foreground",
                      )}
                    >
                      <Icon className="size-3.5" />
                      {label}
                    </Link>
                  );
                })}
              </nav>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
