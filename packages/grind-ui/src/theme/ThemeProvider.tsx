import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';
import { lightTheme, darkTheme } from './tokens';
import type { ColorScheme, ThemeContextValue } from './types';

export const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: React.ReactNode;
  initialScheme?: ColorScheme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialScheme = 'system',
}) => {
  const systemScheme = useSystemColorScheme();
  const [preference, setPreference] = useState<ColorScheme>(initialScheme);

  const resolvedScheme: 'light' | 'dark' =
    preference === 'system'
      ? (systemScheme ?? 'dark')
      : preference;

  const theme = resolvedScheme === 'dark' ? darkTheme : lightTheme;

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
      toggleTheme,
      setColorScheme: setPreference,
    }),
    [theme, resolvedScheme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
