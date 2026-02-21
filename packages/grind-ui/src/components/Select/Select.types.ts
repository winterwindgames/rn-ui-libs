import { ViewStyle } from 'react-native';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  /** Label above select */
  label?: string;
  /** Currently selected value */
  value?: string;
  /** Options list */
  options: SelectOption[];
  /** Selection handler */
  onSelect?: (value: string) => void;
  /** Placeholder when no value */
  placeholder?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
  /** Style override */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
}
