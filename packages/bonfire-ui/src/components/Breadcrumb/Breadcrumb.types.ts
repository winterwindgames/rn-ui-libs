import type { ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

export interface BreadcrumbItem {
  label: string;
  onPress?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: string | ReactNode;
  style?: ViewStyle;
  testID?: string;
}
