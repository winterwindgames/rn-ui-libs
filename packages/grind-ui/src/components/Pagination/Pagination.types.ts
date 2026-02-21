import { ViewStyle } from 'react-native';

export interface PaginationProps {
  total: number;
  current: number;
  onPageChange?: (page: number) => void;
  variant?: 'dots' | 'numbers';
  color?: string;
  style?: ViewStyle;
  testID?: string;
}
