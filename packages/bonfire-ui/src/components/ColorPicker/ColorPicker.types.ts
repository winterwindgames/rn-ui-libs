import type { ViewStyle } from 'react-native';

export interface ColorPickerProps {
  colors?: string[];
  value?: string;
  onChange?: (color: string) => void;
  size?: number;
  style?: ViewStyle;
  testID?: string;
}
