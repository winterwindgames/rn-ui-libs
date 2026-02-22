import { ViewStyle, TextStyle } from 'react-native';

export interface TextAreaProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  maxLength?: number;
  numberOfLines?: number;
  disabled?: boolean;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  testID?: string;
}
