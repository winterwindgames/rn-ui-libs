import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export type IconButtonVariant = 'solid' | 'outline' | 'ghost';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps {
  /** Icon element */
  icon: ReactNode;
  /** Button variant */
  variant?: IconButtonVariant;
  /** Button size */
  size?: IconButtonSize;
  /** Theme color key */
  color?: string;
  /** Circular shape */
  rounded?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Press handler */
  onPress?: () => void;
  /** Style override */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
}
