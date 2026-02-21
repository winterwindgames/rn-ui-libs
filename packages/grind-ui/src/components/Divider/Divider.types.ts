import type { ViewStyle, StyleProp } from 'react-native';

export type DividerProps = {
  direction?: 'horizontal' | 'vertical';
  color?: string;
  thickness?: number;
  spacing?: string | number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  accessible?: boolean;
  accessibilityLabel?: string;
};
