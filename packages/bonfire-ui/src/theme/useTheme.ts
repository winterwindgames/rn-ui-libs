import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';
import type { ThemeContextValue, Theme } from './types';

export const useTheme = (): ThemeContextValue & Theme => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a <ThemeProvider>');
  }
  return { ...ctx, ...ctx.theme };
};
