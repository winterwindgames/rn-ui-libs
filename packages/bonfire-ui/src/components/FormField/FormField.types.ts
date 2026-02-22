import type { ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

export interface FormFieldProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  children?: ReactNode;
  style?: ViewStyle;
  testID?: string;
}
