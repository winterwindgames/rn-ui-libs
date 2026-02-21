import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface TabBarItem {
  key: string;
  label: string;
  icon: (props: { color: string; size: number; focused: boolean }) => ReactNode;
  accessibilityLabel?: string;
}

export interface TabBarProps {
  items: TabBarItem[];
  activeKey: string;
  onTabPress: (key: string) => void;
  style?: ViewStyle;
  testID?: string;
}
