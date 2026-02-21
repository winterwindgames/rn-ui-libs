import { ViewStyle } from 'react-native';

export type ProgressBarVariant = 'determinate' | 'indeterminate';

export interface ProgressBarProps {
  value?: number;
  variant?: ProgressBarVariant;
  color?: string;
  height?: number;
  rounded?: boolean;
  animated?: boolean;
  style?: ViewStyle;
  testID?: string;
}
