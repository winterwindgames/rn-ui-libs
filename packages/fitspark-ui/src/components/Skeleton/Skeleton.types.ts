import { ViewStyle, StyleProp } from 'react-native';

export type SkeletonVariant = 'rect' | 'circle' | 'text';

export interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
