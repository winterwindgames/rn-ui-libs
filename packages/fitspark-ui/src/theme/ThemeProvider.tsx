import React, { createContext, useState, useCallback } from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';
import type { ThemeContextValue, ColorScheme } from './types';
import { darkTheme, lightTheme } from './tokens';

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ initialScheme?: ColorScheme; children: React.ReactNode }> = ({
  initialScheme = 'dark',
  children,
}) => {
  const systemScheme = useSystemColorScheme();
  const [colorSchemeState, setColorSchemeState] = useState<ColorScheme>(initialScheme);

  const resolved = colorSchemeState === 'system' ? (systemScheme ?? 'dark') : colorSchemeState;
  const theme = resolved === 'dark' ? darkTheme : lightTheme;

  const toggleTheme = useCallback(() => {
    setColorSchemeState((prev) => {
      const cur = prev === 'system' ? (systemScheme ?? 'dark') : prev;
      return cur === 'dark' ? 'light' : 'dark';
    });
  }, [systemScheme]);

  const value: ThemeContextValue = { theme, colorScheme: resolved, setColorScheme: setColorSchemeState, toggleTheme };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
