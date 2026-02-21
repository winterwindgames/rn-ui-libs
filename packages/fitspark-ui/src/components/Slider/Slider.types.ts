import type { ViewStyle } from 'react-native';

export interface SliderProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number) => void;
  onSlidingComplete?: (value: number) => void;
  disabled?: boolean;
  trackHeight?: number;
  thumbSize?: number;
  label?: string;
  showValue?: boolean;
  style?: ViewStyle;
  testID?: string;
}
