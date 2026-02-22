import type { ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

export type IconButtonVariant = 'solid' | 'outline' | 'ghost';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps {
  icon: ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  color?: string;
  rounded?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  testID?: string;
  accessibilityLabel?: string;
}
