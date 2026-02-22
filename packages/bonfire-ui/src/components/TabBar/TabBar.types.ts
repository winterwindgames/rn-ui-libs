import type { ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

export interface TabBarItem {
  key?: string;
  label: string;
  icon: ReactNode | ((props: { color: string; size: number }) => ReactNode);
}

export interface TabBarProps {
  tabs?: TabBarItem[];
  items?: TabBarItem[];
  activeKey?: string;
  activeIndex?: number;
  onTabPress?: (key: string) => void;
  onChange?: (index: number) => void;
  style?: ViewStyle;
  testID?: string;
}
