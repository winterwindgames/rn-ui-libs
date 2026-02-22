import type { ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

export interface CollapsibleProps {
  expanded?: boolean;
  duration?: number;
  children?: ReactNode;
  style?: ViewStyle;
  testID?: string;
}
