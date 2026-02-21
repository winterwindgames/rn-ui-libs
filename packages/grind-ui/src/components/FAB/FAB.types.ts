import { ViewStyle } from 'react-native';
import { ReactNode } from 'react';

export interface FABProps {
  icon: ReactNode;
  label?: string;
  onPress: () => void;
  position?: 'bottomRight' | 'bottomLeft' | 'bottomCenter';
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  style?: ViewStyle;
  testID?: string;
}
