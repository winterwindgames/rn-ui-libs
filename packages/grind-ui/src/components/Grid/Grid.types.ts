import { ViewStyle } from 'react-native';
import { ReactNode } from 'react';

export interface GridProps {
  columns?: 2 | 3 | 4;
  gap?: string;
  children: ReactNode;
  style?: ViewStyle;
  testID?: string;
}
