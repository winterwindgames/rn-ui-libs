import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface TabItem {
  label: string;
  icon?: ReactNode;
  content: ReactNode;
}

export type TabsVariant = 'underline' | 'filled' | 'pill';

export interface TabsProps {
  tabs: TabItem[];
  activeIndex?: number;
  onTabChange?: (index: number) => void;
  variant?: TabsVariant;
  scrollable?: boolean;
  lazy?: boolean;
  style?: ViewStyle;
  testID?: string;
}
