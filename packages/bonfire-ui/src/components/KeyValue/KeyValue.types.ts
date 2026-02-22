import type { ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

export interface KeyValueProps {
  label: string;
  value: string | ReactNode;
  orientation?: 'horizontal' | 'vertical';
  style?: ViewStyle;
  testID?: string;
}
