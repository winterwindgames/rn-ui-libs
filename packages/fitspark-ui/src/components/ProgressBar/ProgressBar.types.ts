import { ViewStyle, StyleProp } from 'react-native';

export interface ProgressBarProps {
  progress?: number;
  indeterminate?: boolean;
  color?: string;
  trackColor?: string;
  height?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
