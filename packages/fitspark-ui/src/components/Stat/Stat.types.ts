import { ReactNode } from 'react';
import { ViewStyle, StyleProp } from 'react-native';

export interface StatProps {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
