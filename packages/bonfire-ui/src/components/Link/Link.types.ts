import type { TextStyle } from 'react-native';
import type { ReactNode } from 'react';

export interface LinkProps {
  href?: string;
  onPress?: () => void;
  children: string | ReactNode;
  color?: string;
  underline?: 'always' | 'hover' | 'none';
  size?: 'sm' | 'md' | 'lg';
  external?: boolean;
  disabled?: boolean;
  style?: TextStyle;
  testID?: string;
}
