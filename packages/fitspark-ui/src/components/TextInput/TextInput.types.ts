import type { TextInputProps as RNTextInputProps, ViewStyle, TextStyle } from 'react-native';

export type TextInputSize = 'sm' | 'md' | 'lg';

export interface TextInputProps extends Omit<RNTextInputProps, 'style'> {
  label?: string;
  error?: string;
  hint?: string;
  size?: TextInputSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  style?: ViewStyle;
  testID?: string;
}
