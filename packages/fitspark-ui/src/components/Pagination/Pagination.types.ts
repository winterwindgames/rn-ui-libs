import { ViewStyle } from 'react-native';

export interface PaginationProps {
  total: number;
  activeIndex: number;
  onDotPress?: (index: number) => void;
  dotSize?: number;
  activeDotWidth?: number;
  style?: ViewStyle;
  testID?: string;
}
