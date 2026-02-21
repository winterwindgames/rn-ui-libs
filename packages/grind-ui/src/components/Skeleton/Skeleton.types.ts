import { ViewStyle } from 'react-native';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular';

export interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  variant?: SkeletonVariant;
  style?: ViewStyle;
  testID?: string;
}
