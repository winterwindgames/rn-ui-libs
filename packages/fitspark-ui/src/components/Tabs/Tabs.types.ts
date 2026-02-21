import type { ViewStyle } from 'react-native';

export interface TabItem {
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

export type TabVariant = 'underline' | 'filled' | 'pill';

export interface TabsProps {
  tabs: TabItem[];
  activeIndex?: number;
  onTabChange?: (index: number) => void;
  variant?: TabVariant;
  scrollable?: boolean;
  lazy?: boolean;
  style?: ViewStyle;
  testID?: string;
}
