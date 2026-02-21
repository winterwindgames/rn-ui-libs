import type { ViewStyle } from 'react-native';

export interface ColorPickerProps {
  colors?: string[];
  value?: string;
  onValueChange?: (color: string) => void;
  columns?: number;
  swatchSize?: number;
  label?: string;
  disabled?: boolean;
  style?: ViewStyle;
  testID?: string;
}
