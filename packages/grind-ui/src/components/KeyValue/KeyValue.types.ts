import { ReactNode } from 'react';
import { ViewStyle, StyleProp } from 'react-native';

export type KeyValueDirection = 'horizontal' | 'vertical';

export interface KeyValueProps {
  label: string;
  value: string | ReactNode;
  direction?: KeyValueDirection;
  labelWidth?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
