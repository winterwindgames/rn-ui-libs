import type { ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

export interface FormGroupProps {
  title?: string;
  error?: string;
  children?: ReactNode;
  style?: ViewStyle;
  testID?: string;
}
