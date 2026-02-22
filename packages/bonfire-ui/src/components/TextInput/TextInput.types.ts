import { ViewStyle, TextStyle, ReactNode, KeyboardTypeOptions } from 'react-native';

export type TextInputSize = 'sm' | 'md' | 'lg';

export interface TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  hint?: string;
  size?: TextInputSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  disabled?: boolean;
  autoFocus?: boolean;
  onSubmit?: () => void;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  testID?: string;
}
