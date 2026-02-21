import type { ViewStyle } from 'react-native';
import type { ThemeColors, ThemeSpacing } from '../../theme/types';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  color?: keyof ThemeColors | string;
  thickness?: number;
  spacing?: keyof ThemeSpacing | number;
  inset?: number;
  style?: ViewStyle;
  testID?: string;
}
