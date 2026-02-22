import type { ViewStyle } from 'react-native';

export interface RadioGroupProps {
  value?: string;
  onChange?: (value: string) => void;
  children?: React.ReactNode;
  style?: ViewStyle;
  testID?: string;
}

export interface RadioProps {
  value: string;
  label?: string;
  disabled?: boolean;
  style?: ViewStyle;
  testID?: string;
}
