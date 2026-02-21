import { ReactNode } from 'react';
import { TextStyle } from 'react-native';

export type LinkUnderline = 'always' | 'hover' | 'none';

export interface LinkProps {
  href?: string;
  onPress?: () => void;
  children: ReactNode;
  color?: string;
  underline?: LinkUnderline;
  size?: 'sm' | 'md' | 'lg';
  external?: boolean;
  disabled?: boolean;
  style?: TextStyle;
  testID?: string;
}
