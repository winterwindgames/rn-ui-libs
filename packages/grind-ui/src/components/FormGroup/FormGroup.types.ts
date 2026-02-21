import { ViewStyle } from 'react-native';
import { ReactNode } from 'react';

export interface FormGroupProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  style?: ViewStyle;
  testID?: string;
}
