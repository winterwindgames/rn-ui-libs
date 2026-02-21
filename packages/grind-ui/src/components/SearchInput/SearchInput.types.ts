import { ViewStyle } from 'react-native';

export interface SearchInputProps {
  /** Current search value */
  value?: string;
  /** Value change handler */
  onChangeText?: (text: string) => void;
  /** Submit/search handler */
  onSubmit?: (text: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Debounce delay in ms */
  debounceMs?: number;
  /** Show loading indicator */
  loading?: boolean;
  /** Show clear button */
  clearable?: boolean;
  /** Style override */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
}
