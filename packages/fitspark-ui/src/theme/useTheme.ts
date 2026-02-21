import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';
import type { ThemeContextValue, Theme } from './types';

export const useTheme = (): ThemeContextValue & Theme => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a <ThemeProvider>');
  }
  if (!ctx.theme) {
    console.error('[useTheme] ctx exists but ctx.theme is undefined. ctx keys:', Object.keys(ctx));
  }
  return { ...ctx, ...ctx.theme };
};
