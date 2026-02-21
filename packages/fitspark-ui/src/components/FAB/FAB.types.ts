import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface FABProps {
  icon: ReactNode;
  onPress: () => void;
  label?: string;
  size?: 'small' | 'medium' | 'large';
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center';
  disabled?: boolean;
  style?: ViewStyle;
  testID?: string;
}
