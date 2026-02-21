import { ViewStyle } from 'react-native';
import { ReactNode } from 'react';

export interface StickyHeaderProps {
  headerContent: ReactNode;
  children: ReactNode;
  style?: ViewStyle;
  testID?: string;
}
