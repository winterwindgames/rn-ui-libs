import type { ViewStyle } from 'react-native';

export interface ProgressCircleProps {
  progress?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  showValue?: boolean;
  style?: ViewStyle;
  testID?: string;
}
