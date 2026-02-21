import { ReactNode } from 'react';
import { ViewStyle, TextStyle } from 'react-native';

export interface FormGroupProps {
  title?: string;
  description?: string;
  children: ReactNode;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  testID?: string;
}
