import type { ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

export interface FABProps {
  icon: ReactNode;
  onPress?: () => void;
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
  extended?: boolean;
  label?: string;
  color?: string;
  style?: ViewStyle;
  testID?: string;
}
