import { ReactNode } from 'react';
import { ViewStyle, StyleProp } from 'react-native';

export type CardVariant = 'elevated' | 'outlined' | 'filled';

export interface CardProps {
  variant?: CardVariant;
  children?: ReactNode;
  header?: ReactNode;
  footer?: ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
