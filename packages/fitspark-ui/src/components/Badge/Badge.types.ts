import { ReactNode } from 'react';
import { ViewStyle, StyleProp } from 'react-native';

export type BadgeVariant = 'solid' | 'outline' | 'dot';
export type BadgeColor = 'accent' | 'error' | 'warning' | 'info' | 'default';

export interface BadgeProps {
  label?: string;
  variant?: BadgeVariant;
  color?: BadgeColor;
  children?: ReactNode;
  count?: number;
  maxCount?: number;
  visible?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
