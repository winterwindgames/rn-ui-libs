import type { ViewStyle } from 'react-native';

export interface SwitchProps {
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: 'sm' | 'md';
  style?: ViewStyle;
  testID?: string;
}
