import type { ViewStyle } from 'react-native';

export type BadgeVariant = 'standard' | 'dot' | 'solid' | 'outline' | 'soft';

export interface BadgeProps {
  content?: string | number;
  label?: string;
  variant?: BadgeVariant;
  color?: string;
  max?: number;
  style?: ViewStyle;
  testID?: string;
}
