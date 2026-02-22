import React, { createContext, useCallback, useMemo, useState } from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';
import { buildTheme } from './tokens';
import type { ColorScheme, PaletteName, ThemeContextValue } from './types';

export const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: React.ReactNode;
  initialScheme?: ColorScheme;
  initialPalette?: PaletteName;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialScheme = 'system',
  initialPalette = 'default',
}) => {
  const systemScheme = useSystemColorScheme();
  const [preference, setPreference] = useState<ColorScheme>(initialScheme);
  const [palette, setPalette] = useState<PaletteName>(initialPalette);

  const resolvedScheme: 'light' | 'dark' =
    preference === 'system'
      ? (systemScheme ?? 'dark')
      : preference;

  const theme = buildTheme(palette, resolvedScheme);

  const toggleTheme = useCallback(() => {
    setPreference((prev) => {
      if (prev === 'system') {
        return resolvedScheme === 'dark' ? 'light' : 'dark';
      }
      return prev === 'dark' ? 'light' : 'dark';
    });
  }, [resolvedScheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      colorScheme: resolvedScheme,
      palette,
      toggleTheme,
      setColorScheme: setPreference,
      setPalette,
    }),
    [theme, resolvedScheme, palette, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
