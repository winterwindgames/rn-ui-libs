import type { ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

export interface TabDef {
  label: string;
  icon?: ReactNode;
  content: ReactNode;
}

export type TabVariant = 'underline' | 'filled' | 'pill';

export interface TabsProps {
  tabs: TabDef[];
  activeIndex?: number;
  onTabChange?: (index: number) => void;
  variant?: TabVariant;
  scrollable?: boolean;
  lazy?: boolean;
  style?: ViewStyle;
  testID?: string;
}
