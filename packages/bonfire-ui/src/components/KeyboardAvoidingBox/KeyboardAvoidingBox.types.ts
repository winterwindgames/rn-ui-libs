import type { ViewStyle, StyleProp } from 'react-native';
import type { ReactNode } from 'react';

export interface KeyboardAvoidingBoxProps {
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  testID?: string;
}
