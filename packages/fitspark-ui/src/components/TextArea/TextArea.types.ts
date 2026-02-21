import type { TextInputProps as RNTextInputProps, ViewStyle, TextStyle } from 'react-native';

export interface TextAreaProps extends Omit<RNTextInputProps, 'style' | 'multiline'> {
  label?: string;
  error?: string;
  minHeight?: number;
  maxHeight?: number;
  autoGrow?: boolean;
  disabled?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  style?: ViewStyle;
  testID?: string;
}
