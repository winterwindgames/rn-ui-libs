import { ViewStyle } from 'react-native';

export type CheckboxSize = 'sm' | 'md' | 'lg';

export interface CheckboxProps {
  /** Checked state */
  checked?: boolean;
  /** Indeterminate state */
  indeterminate?: boolean;
  /** Toggle handler */
  onToggle?: (checked: boolean) => void;
  /** Label text */
  label?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Theme color key */
  color?: string;
  /** Size */
  size?: CheckboxSize;
  /** Style override */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
}
