import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface ProgressCircleProps {
  value?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
  showValue?: boolean;
  children?: ReactNode;
  style?: ViewStyle;
  testID?: string;
}
