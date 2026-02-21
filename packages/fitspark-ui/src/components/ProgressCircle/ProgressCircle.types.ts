import { ReactNode } from 'react';
import { ViewStyle, StyleProp } from 'react-native';

export interface ProgressCircleProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
