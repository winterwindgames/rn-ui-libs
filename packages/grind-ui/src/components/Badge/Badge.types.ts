import { ViewStyle, StyleProp } from 'react-native';

export type BadgeVariant = 'solid' | 'outline' | 'dot';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  value?: string | number;
  variant?: BadgeVariant;
  color?: string;
  size?: BadgeSize;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
