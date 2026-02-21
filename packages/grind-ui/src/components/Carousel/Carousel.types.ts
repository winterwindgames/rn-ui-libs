import { ViewStyle } from 'react-native';
import { ReactNode } from 'react';

export interface CarouselProps<T = any> {
  data: T[];
  renderItem: (item: T, index: number) => ReactNode;
  itemWidth: number;
  gap?: number;
  showPagination?: boolean;
  style?: ViewStyle;
  testID?: string;
}
