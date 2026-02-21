import { ReactNode } from 'react';
import { ViewStyle, StyleProp } from 'react-native';

export type TagVariant = 'solid' | 'outline' | 'subtle';
export type TagSize = 'sm' | 'md';

export interface TagProps {
  label: string;
  variant?: TagVariant;
  color?: string;
  leftIcon?: ReactNode;
  onRemove?: () => void;
  size?: TagSize;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
