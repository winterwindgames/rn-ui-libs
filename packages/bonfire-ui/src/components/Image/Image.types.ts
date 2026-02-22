import type { ViewStyle, ImageSourcePropType } from 'react-native';
import type { ReactNode } from 'react';

export interface ImageProps {
  source: ImageSourcePropType;
  fallback?: ReactNode;
  aspectRatio?: number;
  borderRadius?: number;
  width?: number | string;
  height?: number | string;
  style?: ViewStyle;
  testID?: string;
}
