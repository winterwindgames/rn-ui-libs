import type { ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

export interface CarouselProps {
  data: any[];
  renderItem: (item: any, index: number) => ReactNode;
  showPagination?: boolean;
  autoPlay?: boolean;
  style?: ViewStyle;
  testID?: string;
}
