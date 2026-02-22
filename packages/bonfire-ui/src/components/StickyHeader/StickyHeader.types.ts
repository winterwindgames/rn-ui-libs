import type { ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

export interface StickyHeaderProps {
  header: ReactNode;
  stickyOffset?: number;
  children?: ReactNode;
  style?: ViewStyle;
  testID?: string;
}
