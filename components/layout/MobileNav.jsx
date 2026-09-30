"use client";

import Link from "next/link";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export function MobileNav({ open, onOpenChange }) {
  const { isAuthenticated } = useAuth();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right">
        <nav className="mt-3 pl-6 flex flex-col gap-4">
          <Link href="/" className="text-xl font-bold tracking-wide">
            <span className="text-blue-600">Apni</span>{" "}
            <span className="text-orange-500">University</span>
          </Link>
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => onOpenChange(false)}
              className="text-base font-medium"
            >
              {item.label}
            </Link>
          ))}
          {!isAuthenticated && (
            <div className="mt-4 flex flex-col gap-2">
              <Button variant="outline">
                <Link href="/login" onClick={() => onOpenChange(false)}>
                  Log in
                </Link>
              </Button>
              <Button>
                <Link href="/register" onClick={() => onOpenChange(false)}>
                  Get started
                </Link>
              </Button>
            </div>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
