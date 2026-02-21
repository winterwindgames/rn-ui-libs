import type { TextStyle } from 'react-native';

export type LinkUnderline = 'always' | 'hover' | 'none';

export interface LinkProps {
  href?: string;
  onPress?: () => void;
  children: React.ReactNode;
  color?: string;
  underline?: LinkUnderline;
  size?: number;
  external?: boolean;
  disabled?: boolean;
  style?: TextStyle;
  testID?: string;
}
