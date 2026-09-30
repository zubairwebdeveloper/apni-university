"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Moon,
  Sun,
  Menu,
  LogOut,
  LayoutDashboard,
  Settings,
  UserPen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import EditProfileDialog from "@/components/settings/EditProfileDialog";
import { Container } from "./Container";
import { MobileNav } from "./MobileNav";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, user, profile, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const displayName =
    profile?.fullName || profile?.name || user?.displayName || "User";
  const displayEmail = profile?.email || user?.email || "";
  const photoURL = profile?.photoURL || user?.photoURL || undefined;
  const initial = displayName[0]?.toUpperCase() || "U";

  const handleLogout = async () => {
    await logout();
    setLogoutOpen(false);
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-wide">
          <span className="text-blue-600">Apni</span>{" "}
          <span className="text-orange-500">University</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {siteConfig.nav.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative py-2 text-md font-bold transition-colors duration-300",
                  "text-purple-600 hover:text-blue-600 dark:text-white dark:hover:text-blue-600",
                  isActive && "text-blue-600",
                )}
              >
                {item.label}

                {/* Animated Underline */}
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-0.5 rounded-full bg-blue-600",
                    "transition-all duration-300 ease-out",
                    isActive ? "w-full" : "w-0 group-hover:w-full",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          {isAuthenticated ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger className="rounded-full outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring">
                  <Avatar>
                    <AvatarImage src={photoURL} alt={displayName} />
                    <AvatarFallback>{initial}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-64">
                  {/* User info */}
                  <div className="flex items-center gap-3 px-2 py-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={photoURL} alt={displayName} />
                      <AvatarFallback>{initial}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {displayName}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {displayEmail}
                      </p>
                    </div>
                  </div>

                  <DropdownMenuSeparator />
                  {/* Sirf dialog kholta hai, dialog khud neeche bahar rakha hai */}
                  <DropdownMenuItem onClick={() => setEditOpen(true)}>
                    <UserPen className="mr-2 h-4 w-4" /> Edit Profile
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                    <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => router.push("/dashboard/settings")}
                  >
                    <Settings className="mr-2 h-4 w-4" /> Settings
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <Button
                    variant="default"
                    className="w-full justify-center hover:bg-pink-600 hover:text-white"
                    onClick={() => setLogoutOpen(true)}
                  >
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                  </Button>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Dropdown ke BAHAR: dropdown band hone par ye band nahi hote */}
              <EditProfileDialog open={editOpen} onOpenChange={setEditOpen} />

              <AlertDialog open={logoutOpen} onOpenChange={setLogoutOpen}>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Log out?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to log out? You’ll need to log in
                      again to access your account.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout}>
                      Log out
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Button variant="ghost">
                <Link href="/login">Log in</Link>
              </Button>
              <Button>
                <Link href="/register">Get started</Link>
              </Button>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </Container>

      <MobileNav open={mobileOpen} onOpenChange={setMobileOpen} />
    </header>
  );
}
