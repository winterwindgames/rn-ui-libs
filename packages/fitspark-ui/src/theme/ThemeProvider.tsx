import React, { createContext, useState, useCallback } from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';
import type { ThemeContextValue, ColorScheme, PaletteName } from './types';
import { buildTheme } from './tokens';

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{
  initialScheme?: ColorScheme;
  initialPalette?: PaletteName;
  children: React.ReactNode;
}> = ({
  initialScheme = 'dark',
  initialPalette = 'default',
  children,
}) => {
  const systemScheme = useSystemColorScheme();
  const [colorSchemeState, setColorSchemeState] = useState<ColorScheme>(initialScheme);
  const [palette, setPalette] = useState<PaletteName>(initialPalette);

  const resolved = colorSchemeState === 'system' ? (systemScheme ?? 'dark') : colorSchemeState;
  const theme = buildTheme(palette, resolved);

  const toggleTheme = useCallback(() => {
    setColorSchemeState((prev) => {
      const cur = prev === 'system' ? (systemScheme ?? 'dark') : prev;
      return cur === 'dark' ? 'light' : 'dark';
    });
  }, [systemScheme]);

  const value: ThemeContextValue = {
    theme,
    colorScheme: resolved,
    palette,
    toggleTheme,
    setColorScheme: setColorSchemeState,
    setPalette,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
