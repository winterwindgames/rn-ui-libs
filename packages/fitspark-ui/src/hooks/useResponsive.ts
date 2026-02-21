import { useWindowDimensions } from 'react-native';
import { useMemo } from 'react';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const BREAKPOINTS = { xs: 0, sm: 375, md: 428, lg: 768, xl: 1024 } as const;

export interface ResponsiveInfo {
  width: number;
  height: number;
  breakpoint: Breakpoint;
  isSmall: boolean;
  isMedium: boolean;
  isLarge: boolean;
  isTablet: boolean;
  select: <T>(map: Partial<Record<Breakpoint, T>> & { xs: T }) => T;
}

export const useResponsive = (): ResponsiveInfo => {
  const { width, height } = useWindowDimensions();

  return useMemo(() => {
    const breakpoint: Breakpoint =
      width >= BREAKPOINTS.xl ? 'xl' :
      width >= BREAKPOINTS.lg ? 'lg' :
      width >= BREAKPOINTS.md ? 'md' :
      width >= BREAKPOINTS.sm ? 'sm' : 'xs';

    const select = <T,>(map: Partial<Record<Breakpoint, T>> & { xs: T }): T => {
      const order: Breakpoint[] = ['xl', 'lg', 'md', 'sm', 'xs'];
      const idx = order.indexOf(breakpoint);
      for (let i = idx; i < order.length; i++) {
        const val = map[order[i]];
        if (val !== undefined) return val;
      }
      return map.xs;
    };

    return {
      width,
      height,
      breakpoint,
      isSmall: width < BREAKPOINTS.md,
      isMedium: width >= BREAKPOINTS.md && width < BREAKPOINTS.lg,
      isLarge: width >= BREAKPOINTS.lg,
      isTablet: width >= BREAKPOINTS.lg,
      select,
    };
  }, [width, height]);
};
