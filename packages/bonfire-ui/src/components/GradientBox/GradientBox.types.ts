import type { ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

export interface GradientBoxProps {
  colors: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  children?: ReactNode;
  style?: ViewStyle;
  testID?: string;
}
