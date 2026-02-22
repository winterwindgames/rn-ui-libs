import type { ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  message?: string;
  action?: { label: string; onPress: () => void };
  style?: ViewStyle;
  testID?: string;
}
