import type { ViewStyle } from 'react-native';

export interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  direction?: 'row' | 'column';
  gap?: number;
  disabled?: boolean;
  style?: ViewStyle;
  testID?: string;
}

export interface RadioProps {
  selected?: boolean;
  label?: string;
  onPress?: () => void;
  disabled?: boolean;
  size?: number;
  style?: ViewStyle;
  testID?: string;
}
