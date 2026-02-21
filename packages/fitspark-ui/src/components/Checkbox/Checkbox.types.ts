import type { ViewStyle } from 'react-native';

export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: number;
  style?: ViewStyle;
  testID?: string;
}
