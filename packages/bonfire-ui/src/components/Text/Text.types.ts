import type { TextStyle, StyleProp } from 'react-native';
import type { ReactNode } from 'react';

export type TextVariant =
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'bodyLg' | 'body' | 'bodySm'
  | 'caption' | 'label' | 'overline' | 'stat';

export type TextProps = {
  variant?: TextVariant;
  color?: string;
  align?: TextStyle['textAlign'];
  numberOfLines?: number;
  style?: StyleProp<TextStyle>;
  children?: ReactNode;
  testID?: string;
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityRole?: string;
};
