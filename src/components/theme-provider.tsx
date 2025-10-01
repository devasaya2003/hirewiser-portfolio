"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { useHydrated } from "@/hooks/use-hydrated";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const hydrated = useHydrated();

  // Prevent hydration mismatch by not rendering theme-dependent content until hydrated
  if (!hydrated) {
    return (
      <div suppressHydrationWarning>
        {children}
      </div>
    );
  }

  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  );
}
