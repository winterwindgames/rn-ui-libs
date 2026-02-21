import { ViewStyle, ReactNode } from 'react-native';

export interface TabItem {
  label: string;
  icon: ReactNode;
  activeIcon?: ReactNode;
  badge?: number | string;
}

export interface TabBarProps {
  tabs: TabItem[];
  activeIndex: number;
  onChange: (index: number) => void;
  style?: ViewStyle;
  testID?: string;
}
