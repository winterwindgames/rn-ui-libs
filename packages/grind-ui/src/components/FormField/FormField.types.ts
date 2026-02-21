import { ViewStyle } from 'react-native';
import { ReactNode } from 'react';

export interface FormFieldProps {
  label?: string;
  helperText?: string;
  error?: boolean;
  errorMessage?: string;
  required?: boolean;
  children: ReactNode;
  style?: ViewStyle;
  testID?: string;
}
