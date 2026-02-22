import { useWindowDimensions } from 'react-native';

export type Breakpoint = 'sm' | 'md' | 'lg' | 'xl';

const BREAKPOINTS: Record<Breakpoint, number> = {
  sm: 0,
  md: 768,
  lg: 1024,
  xl: 1280,
};

export const useResponsive = () => {
  const { width, height } = useWindowDimensions();

  const breakpoint: Breakpoint =
    width >= BREAKPOINTS.xl ? 'xl' :
    width >= BREAKPOINTS.lg ? 'lg' :
    width >= BREAKPOINTS.md ? 'md' : 'sm';

  const isMobile = breakpoint === 'sm';
  const isTablet = breakpoint === 'md';
  const isDesktop = breakpoint === 'lg' || breakpoint === 'xl';

  const select = <T,>(values: Partial<Record<Breakpoint, T>> & { sm: T }): T => {
    if (values[breakpoint] !== undefined) return values[breakpoint]!;
    const keys: Breakpoint[] = ['xl', 'lg', 'md', 'sm'];
    for (const key of keys) {
      if (BREAKPOINTS[key] <= width && values[key] !== undefined) return values[key]!;
    }
    return values.sm;
  };

  return { width, height, breakpoint, isMobile, isTablet, isDesktop, select };
};
