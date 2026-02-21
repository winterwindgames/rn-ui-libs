import { ReactNode } from 'react';
import { ViewStyle, StyleProp } from 'react-native';

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
