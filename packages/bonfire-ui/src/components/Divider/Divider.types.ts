import type { ViewStyle } from 'react-native';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  color?: string;
  thickness?: number;
  spacing?: string | number;
  style?: ViewStyle;
  testID?: string;
}
