import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface CarouselProps {
  data: any[];
  renderItem: (item: any, index: number) => ReactNode;
  itemWidth?: number;
  showPagination?: boolean;
  onIndexChange?: (index: number) => void;
  style?: ViewStyle;
  testID?: string;
}
