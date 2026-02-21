import { ReactNode } from 'react';
import { ViewStyle, StyleProp } from 'react-native';

export type ChangeType = 'increase' | 'decrease' | 'neutral';

export interface StatProps {
  label: string;
  value: string | number;
  change?: number;
  changeType?: ChangeType;
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
