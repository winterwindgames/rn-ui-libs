import type { ViewStyle, StyleProp, ScrollViewProps } from 'react-native';
import type { ReactNode } from 'react';

export interface ScrollBoxProps extends ScrollViewProps {
  bg?: string;
  padded?: boolean;
  contentPadding?: number;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  testID?: string;
}
