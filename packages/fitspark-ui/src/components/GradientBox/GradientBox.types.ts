import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface GradientBoxProps {
  colors?: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  locations?: number[];
  children?: ReactNode;
  style?: ViewStyle;
  testID?: string;
}
