import { ViewStyle, ReactNode } from 'react-native';

export type TagVariant = 'solid' | 'outline' | 'soft';
export type TagSize = 'sm' | 'md';

export interface TagProps {
  label: string;
  variant?: TagVariant;
  size?: TagSize;
  color?: string;
  onRemove?: () => void;
  icon?: ReactNode;
  style?: ViewStyle;
  testID?: string;
}
