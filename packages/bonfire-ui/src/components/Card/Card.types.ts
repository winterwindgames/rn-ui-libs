import type { ViewStyle, StyleProp, ImageSourcePropType } from 'react-native';
import type { ReactNode } from 'react';

export type CardVariant = 'elevated' | 'outlined' | 'filled';

export interface CardProps {
  variant?: CardVariant;
  onPress?: () => void;
  header?: ReactNode;
  footer?: ReactNode;
  image?: ImageSourcePropType;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
