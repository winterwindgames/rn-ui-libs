import type { ScrollViewProps, ViewStyle } from 'react-native';
import type { ThemeSpacing, ThemeColors } from '../../theme/types';

export interface ScrollBoxProps extends ScrollViewProps {
  p?: keyof ThemeSpacing | number;
  px?: keyof ThemeSpacing | number;
  py?: keyof ThemeSpacing | number;
  bg?: keyof ThemeColors | string;
  flex?: number;
  children?: React.ReactNode;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  testID?: string;
}
