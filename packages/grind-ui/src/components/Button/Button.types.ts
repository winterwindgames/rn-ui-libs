import { ReactNode } from 'react';
import { ViewStyle, TextStyle } from 'react-native';

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  /** Button variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Theme color key */
  color?: string;
  /** Button label text */
  label: string;
  /** Icon rendered before label */
  leftIcon?: ReactNode;
  /** Icon rendered after label */
  rightIcon?: ReactNode;
  /** Show loading spinner */
  loading?: boolean;
  /** Disable button */
  disabled?: boolean;
  /** Full width button */
  fullWidth?: boolean;
  /** Press handler */
  onPress?: () => void;
  /** Style override */
  style?: ViewStyle;
  /** Label style override */
  labelStyle?: TextStyle;
  /** Test ID */
  testID?: string;
}
