import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface GridProps {
  columns?: 2 | 3 | 4;
  gap?: number;
  children: ReactNode;
  style?: ViewStyle;
  testID?: string;
}
