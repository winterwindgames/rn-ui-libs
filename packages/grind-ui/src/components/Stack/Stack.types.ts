import type { ViewStyle, StyleProp } from 'react-native';
import type { ReactNode } from 'react';

export type StackProps = {
  direction?: 'row' | 'column';
  gap?: string | number;
  align?: ViewStyle['alignItems'];
  justify?: ViewStyle['justifyContent'];
  wrap?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  testID?: string;
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityRole?: string;
};
