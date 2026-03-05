"use client";

import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme, type Theme } from "@/lib/theme";
import { useState, useRef, useEffect } from "react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const items: { value: Theme; label: string; icon: typeof Sun }[] = [
    { value: "light", label: "Yorug'", icon: Sun },
    { value: "dark", label: "Qorong'i", icon: Moon },
    { value: "system", label: "Sistema", icon: Monitor },
  ];

  const CurrentIcon =
    resolvedTheme === "dark" ? Moon : theme === "system" ? Monitor : Sun;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="h-9 w-9 flex items-center justify-center rounded-lg border border-border hover:bg-muted transition-colors"
        aria-label="Toggle theme"
      >
        <CurrentIcon className="h-4 w-4" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-36 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50 py-1">
          {items.map((item) => (
            <button
              key={item.value}
              onClick={() => {
                setTheme(item.value);
                setOpen(false);
              }}
              className={`flex items-center gap-2.5 w-full px-3 py-2 text-sm transition-colors hover:bg-muted ${
                theme === item.value ? "text-primary font-medium" : "text-muted-foreground"
              }`}
            >
              <item.icon className="h-3.5 w-3.5 shrink-0" />
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
