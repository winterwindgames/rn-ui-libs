import type { ViewStyle } from 'react-native';

export interface PaginationProps {
  total: number;
  current?: number;
  onPageChange?: (page: number) => void;
  variant?: 'dots' | 'numbers';
  style?: ViewStyle;
  testID?: string;
}
