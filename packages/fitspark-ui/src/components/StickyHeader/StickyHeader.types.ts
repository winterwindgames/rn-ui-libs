import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface StickyHeaderProps {
  header: ReactNode;
  children: ReactNode;
  stickyOffset?: number;
  style?: ViewStyle;
  headerStyle?: ViewStyle;
  testID?: string;
}
