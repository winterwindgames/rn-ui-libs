import type { TextProps as RNTextProps, TextStyle } from 'react-native';
import type { ThemeColors, ThemeTypography } from '../../theme/types';

export type TextVariant = keyof ThemeTypography;
export type TextColorToken = keyof ThemeColors;

export interface TextProps extends RNTextProps {
  variant?: TextVariant;
  color?: TextColorToken | string;
  align?: TextStyle['textAlign'];
  weight?: TextStyle['fontWeight'];
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  uppercase?: boolean;
  children?: React.ReactNode;
  style?: TextStyle;
  testID?: string;
}
