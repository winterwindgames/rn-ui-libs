import type { ViewStyle, StyleProp } from 'react-native';
import type { ReactNode } from 'react';

export type BoxProps = {
  padding?: string | number;
  paddingH?: string | number;
  paddingV?: string | number;
  margin?: string | number;
  marginH?: string | number;
  marginV?: string | number;
  bg?: string;
  borderRadius?: string | number;
  shadow?: string;
  flex?: number;
  align?: ViewStyle['alignItems'];
  justify?: ViewStyle['justifyContent'];
  row?: boolean;
  wrap?: boolean;
  border?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  testID?: string;
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityRole?: string;
};
