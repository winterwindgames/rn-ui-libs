import type { ViewStyle } from 'react-native';

export interface ProgressBarProps {
  progress?: number;
  value?: number;
  indeterminate?: boolean;
  color?: string;
  variant?: string;
  height?: number;
  style?: ViewStyle;
  testID?: string;
}
