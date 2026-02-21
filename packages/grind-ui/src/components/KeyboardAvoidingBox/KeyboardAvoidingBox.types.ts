import type { ViewStyle, StyleProp } from 'react-native';
import type { ReactNode } from 'react';

export type KeyboardAvoidingBoxProps = {
  offset?: number;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  testID?: string;
  accessible?: boolean;
  accessibilityLabel?: string;
};
