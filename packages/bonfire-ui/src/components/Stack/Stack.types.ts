import type { ViewStyle, StyleProp } from 'react-native';
import type { ReactNode } from 'react';

export interface StackProps {
  gap?: string | number;
  align?: ViewStyle['alignItems'];
  justify?: ViewStyle['justifyContent'];
  wrap?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  testID?: string;
}
