import { create } from "zustand";

export type Theme = "light" | "dark" | "system";

interface ThemeState {
  theme: Theme;
  setTheme: (t: Theme) => void;
  resolvedTheme: "light" | "dark";
}

function getResolved(t: Theme): "light" | "dark" {
  if (t === "system") {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return t;
}

function applyTheme(resolved: "light" | "dark") {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", resolved === "dark");
}

export const useTheme = create<ThemeState>((set, get) => ({
  theme: "system",
  resolvedTheme: "light",

  setTheme: (theme) => {
    const resolved = getResolved(theme);
    if (typeof window !== "undefined") {
      localStorage.setItem("landing_theme", theme);
    }
    applyTheme(resolved);
    set({ theme, resolvedTheme: resolved });
  },
}));

// Initialize on client
if (typeof window !== "undefined") {
  const saved = (localStorage.getItem("landing_theme") as Theme | null) ?? "system";
  const resolved = getResolved(saved);
  applyTheme(resolved);
  useTheme.setState({ theme: saved, resolvedTheme: resolved });

  // Listen for system preference changes
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", () => {
    const { theme } = useTheme.getState();
    if (theme === "system") {
      const r = getResolved("system");
      applyTheme(r);
      useTheme.setState({ resolvedTheme: r });
    }
  });
}
