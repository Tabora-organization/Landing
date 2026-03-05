"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTranslation, useI18n, type Locale } from "@/lib/i18n";
import { Logo } from "@/components/logo";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://tabora.uz";
const LANGS: { code: Locale; label: string }[] = [
  { code: "uz", label: "UZ" },
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
];

export function Header() {
  const { t } = useTranslation();
  const { locale, setLocale } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const navLinks = [
    { href: "#features", label: t("nav_features") },
    { href: "#how-it-works", label: t("nav_how") },
    { href: "#pricing", label: t("nav_pricing") },
    { href: "#faq", label: t("nav_faq") },
  ];

  return (
    <header
      className={`sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b transition-shadow duration-300 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="container max-w-6xl mx-auto h-16 flex items-center justify-between px-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 shrink-0">
          <Logo size={30} />
          <span className="font-bold text-xl tracking-tight">Tabora</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-1.5">
          {/* Language switcher */}
          <div className="flex items-center border border-border rounded-lg overflow-hidden">
            {LANGS.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLocale(lang.code)}
                className={`px-2.5 py-1.5 text-xs font-medium transition-colors duration-200 ${
                  locale === lang.code
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {/* Theme toggle */}
          <ThemeToggle />

          {/* Sign in */}
          <a href={`${APP_URL}/auth/login`} className="hidden sm:block">
            <Button size="sm" className="ml-0.5">
              {t("nav_login")}
            </Button>
          </a>

          {/* Mobile menu */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-md hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t bg-background px-4 pb-4 pt-2 space-y-1">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-sm py-2.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
          <div className="pt-3 border-t">
            <a href={`${APP_URL}/auth/login`}>
              <Button size="sm" className="w-full">
                {t("nav_login")}
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
