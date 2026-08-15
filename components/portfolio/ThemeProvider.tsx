'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { THEMES, Theme, ThemeName } from '@/lib/themes';

interface ThemeContextValue {
  theme: Theme;
  themeName: ThemeName;
  setTheme: (name: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: THEMES.catppuccin,
  themeName: 'catppuccin',
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>('catppuccin');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('terminal_theme') as ThemeName | null;
      if (saved && saved in THEMES) setThemeName(saved);
    } catch {}
  }, []);

  const setTheme = (name: ThemeName) => {
    setThemeName(name);
    try { localStorage.setItem('terminal_theme', name); } catch {}
  };

  return (
    <ThemeContext.Provider value={{ theme: THEMES[themeName], themeName, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
