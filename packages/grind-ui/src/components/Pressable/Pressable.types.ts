import type { ViewStyle, StyleProp, Insets } from 'react-native';
import type { ReactNode } from 'react';

export type PressableProps = {
  onPress?: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
  scaleValue?: number;
  opacityValue?: number;
  hitSlop?: number | Insets;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  testID?: string;
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityRole?: string;
  accessibilityHint?: string;
};
