import { ReactNode } from 'react';
import { ViewStyle, TextStyle } from 'react-native';

export interface BreadcrumbItem {
  label: string;
  onPress?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  style?: ViewStyle;
  itemStyle?: TextStyle;
  activeItemStyle?: TextStyle;
  testID?: string;
}
