import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';
import type { ThemeContextValue, Theme } from './types';

export type UseThemeReturn = ThemeContextValue & Theme;

export const useTheme = (): UseThemeReturn => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a <ThemeProvider>');
  }
  return {
    ...context,
    ...context.theme,
  };
};
