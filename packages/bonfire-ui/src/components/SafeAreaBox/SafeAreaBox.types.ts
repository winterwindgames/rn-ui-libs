import type { ViewStyle, StyleProp } from 'react-native';
import type { ReactNode } from 'react';

export interface SafeAreaBoxProps {
  bg?: string;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  testID?: string;
}
