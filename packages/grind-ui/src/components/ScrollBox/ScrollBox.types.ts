import type { ViewStyle, StyleProp, ScrollViewProps as RNScrollViewProps } from 'react-native';
import type { ReactNode } from 'react';

export type ScrollBoxProps = {
  padding?: string | number;
  bg?: string;
  horizontal?: boolean;
  showsScrollIndicator?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  children?: ReactNode;
  testID?: string;
  accessible?: boolean;
  accessibilityLabel?: string;
};
