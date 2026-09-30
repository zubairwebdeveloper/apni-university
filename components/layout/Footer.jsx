"use client";

import Link from "next/link";
import { useState } from "react";
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { ArrowUp, ChevronRight, Send } from "lucide-react";
import { Container } from "./Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { notificationService } from "@/lib/services/notificationService";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils/cn";

/* Har social icon ka apna hover rang */
const SOCIALS = [
  {
    key: "github",
    label: "GitHub",
    Icon: FaGithub,
    hover: "hover:text-foreground",
  },
  {
    key: "twitter",
    label: "Twitter",
    Icon: FaTwitter,
    hover: "hover:text-sky-500",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    Icon: FaLinkedin,
    hover: "hover:text-blue-600",
  },
  {
    key: "instagram",
    label: "Instagram",
    Icon: FaInstagram,
    hover: "hover:text-pink-500",
  },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Footer() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSending(true);
    try {
      // TODO: yahan apni API / Firestore call laga dein
      await new Promise((r) => setTimeout(r, 600));
      notificationService.success("Thanks for subscribing!");
      setEmail("");
    } catch {
      notificationService.error("Could not subscribe. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <footer className="relative border-t bg-background">
      {/* Top accent line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-blue-600 via-purple-600 to-orange-500" />

      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-5">
        {/* Brand + newsletter */}
        <div className="lg:col-span-2">
          <Link href="/" className="text-xl font-bold tracking-wide">
            <span className="text-blue-600">Apni</span>{" "}
            <span className="text-orange-500">University</span>
          </Link>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            {siteConfig.description}
          </p>

          {/* Social icons */}
          <div className="mt-4 flex gap-3">
            {SOCIALS.map(({ key, label, Icon, hover }) => {
              const href = siteConfig.links?.[key];
              if (!href) return null;
              return (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={cn(
                    "rounded-full border p-2 text-muted-foreground",
                    "transition-all duration-300 ease-out",
                    "hover:-translate-y-1 hover:scale-110 hover:border-current hover:shadow-md",
                    hover,
                  )}
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>

          {/* Newsletter */}
          <form onSubmit={handleSubscribe} className="mt-6 max-w-sm" noValidate>
            <p className="text-sm font-semibold">Subscribe to our newsletter</p>
            <div className="mt-2 flex gap-2">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-label="Email address"
                aria-invalid={!!error}
                className="transition-shadow duration-300 focus-visible:shadow-md"
              />
              <Button
                type="submit"
                disabled={sending}
                className="group shrink-0 transition-all duration-300 hover:scale-105"
              >
                <Send className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                {sending ? "..." : "Join"}
              </Button>
            </div>
            {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
          </form>
        </div>

        <FooterColumn title="Product" links={siteConfig.footerLinks?.product} />
        <FooterColumn
          title="Resources"
          links={siteConfig.footerLinks?.resources}
        />
        <FooterColumn title="Legal" links={siteConfig.footerLinks?.legal} />
      </Container>

      {/* Bottom bar */}
      <div className="border-t py-6">
        <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className={cn(
              "group flex items-center gap-2 rounded-full border px-4 py-2 text-sm text-muted-foreground",
              "transition-all duration-300 hover:-translate-y-1 hover:border-blue-600 hover:text-blue-600 hover:shadow-md",
            )}
          >
            Back to top
            <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1" />
          </button>
        </Container>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links = [] }) {
  if (!links?.length) return <div />;
  return (
    <div>
      <p className="text-sm font-semibold">{title}</p>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={cn(
                "group relative inline-flex items-center text-sm text-muted-foreground",
                "transition-all duration-300 hover:translate-x-1 hover:text-blue-600",
              )}
            >
              {/* Arrow jo hover par slide hoke aata hai */}
              <ChevronRight className="-ml-4 mr-1 h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:ml-0 group-hover:opacity-100" />
              <span className="relative">
                {link.label}
                {/* Hover underline */}
                <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 rounded-full bg-blue-600 transition-all duration-300 ease-out group-hover:w-full" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
