import { useState, useEffect } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

export type Breakpoint = 'phone' | 'tablet';

export interface ResponsiveInfo {
  width: number;
  height: number;
  breakpoint: Breakpoint;
  isPhone: boolean;
  isTablet: boolean;
}

const TABLET_MIN_WIDTH = 768;

const getInfo = (screen: ScaledSize): ResponsiveInfo => {
  const isTablet = screen.width >= TABLET_MIN_WIDTH;
  return {
    width: screen.width,
    height: screen.height,
    breakpoint: isTablet ? 'tablet' : 'phone',
    isPhone: !isTablet,
    isTablet,
  };
};

export const useResponsive = (): ResponsiveInfo => {
  const [info, setInfo] = useState<ResponsiveInfo>(() =>
    getInfo(Dimensions.get('window')),
  );

  useEffect(() => {
    const sub = Dimensions.addEventListener('change', ({ window }) => {
      setInfo(getInfo(window));
    });
    return () => sub.remove();
  }, []);

  return info;
};
