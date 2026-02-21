import type { ViewStyle, TextStyle } from 'react-native';

export interface SearchInputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  onSearch?: (text: string) => void;
  placeholder?: string;
  debounceMs?: number;
  autoFocus?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  testID?: string;
}
