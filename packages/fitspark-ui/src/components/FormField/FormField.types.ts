import { ReactNode } from 'react';
import { ViewStyle, TextStyle } from 'react-native';

export interface FormFieldProps {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  testID?: string;
}
