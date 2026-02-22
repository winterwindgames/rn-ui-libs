import type { ViewStyle, StyleProp } from 'react-native';
import type { ReactNode } from 'react';

export interface GridProps {
  columns?: number;
  gap?: string | number;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  testID?: string;
}
