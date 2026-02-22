import { ReactNode } from 'react';
import { ViewStyle, TextStyle } from 'react-native';

export type ButtonVariant = 'solid' | 'outline' | 'ghost' | 'link' | 'elevated' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: string;
  label: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  testID?: string;
}
