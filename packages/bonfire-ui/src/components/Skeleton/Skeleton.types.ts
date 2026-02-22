import { ViewStyle } from 'react-native';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular';

export interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
  testID?: string;
}
