import type { ViewStyle } from 'react-native';

export interface CheckboxProps {
  checked?: boolean;
  indeterminate?: boolean;
  onToggle?: (checked: boolean) => void;
  label?: string;
  color?: string;
  disabled?: boolean;
  style?: ViewStyle;
  testID?: string;
}
