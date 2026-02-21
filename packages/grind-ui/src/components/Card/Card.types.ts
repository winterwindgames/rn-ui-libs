import { ReactNode } from 'react';
import { ViewStyle, StyleProp } from 'react-native';

export type CardVariant = 'elevated' | 'outlined' | 'filled';

export interface CardProps {
  variant?: CardVariant;
  padding?: number;
  header?: ReactNode;
  footer?: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  testID?: string;
}
