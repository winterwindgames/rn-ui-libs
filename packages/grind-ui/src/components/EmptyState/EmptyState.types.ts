import { ReactNode } from 'react';
import { ViewStyle, StyleProp } from 'react-native';

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
