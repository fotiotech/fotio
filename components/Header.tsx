"use client";

import Link from "next/link";
import { useState } from "react";
import { MenuIcon, Share2Icon, XIcon } from "lucide-react";

import { ThemeToggle } from "./ThemeToggle";
import type { SiteSetting } from "@/payload-types";

const NAV_LINKS = [
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#services", label: "Services" },
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/blog", label: "Blog" },
  { href: "/#contact", label: "Contact" },
];

export default function Header({ site }: { site: SiteSetting }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  async function sharePage() {
    const url = window.location.href;
    const title = document.title;

    const share = navigator.share;
    if (share) {
      try {
        await share({ title, url });
        return;
      } catch {
        // User cancelled the share sheet — fall through to copy.
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — do nothing harmful.
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <XIcon className="size-5" aria-hidden="true" />
            ) : (
              <MenuIcon className="size-5" aria-hidden="true" />
            )}
          </button>
          <Link href="/" className="text-xl font-bold">
            {site.siteName ?? "Dyfk"}
            <span className="text-primary">.</span>
          </Link>
        </div>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={sharePage}
            aria-label="Share this page"
            className="relative inline-flex items-center justify-center rounded-md p-2 transition-colors hover:bg-muted"
          >
            <Share2Icon className="size-5" aria-hidden="true" />
            {copied && (
              <span className="absolute -bottom-7 right-0 rounded bg-foreground px-2 py-0.5 text-xs text-background">
                Link copied
              </span>
            )}
          </button>
          <ThemeToggle />
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-border md:hidden">
          <nav aria-label="Mobile" className="mx-auto max-w-6xl px-4 py-4">
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {site.phone ? (
                <li>
                  <a
                    href={`tel:${site.phone}`}
                    className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted"
                  >
                    {site.phone}
                  </a>
                </li>
              ) : null}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
