import { ViewStyle } from 'react-native';
import { ReactNode } from 'react';

export interface GradientBoxProps {
  colors: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  locations?: number[];
  style?: ViewStyle;
  children?: ReactNode;
  testID?: string;
}
