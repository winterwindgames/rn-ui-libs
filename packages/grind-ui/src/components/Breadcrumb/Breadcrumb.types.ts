import { ViewStyle } from 'react-native';
import { ReactNode } from 'react';

export interface BreadcrumbItem {
  label: string;
  onPress?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: ReactNode | string;
  style?: ViewStyle;
  testID?: string;
}
