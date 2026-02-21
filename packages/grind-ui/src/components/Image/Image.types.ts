import { ViewStyle, ImageSourcePropType, ImageResizeMode } from 'react-native';
import { ReactNode } from 'react';

export interface ImageProps {
  source: ImageSourcePropType | { uri: string };
  fallback?: ReactNode;
  aspectRatio?: number;
  borderRadius?: number;
  resizeMode?: ImageResizeMode;
  loading?: boolean;
  style?: ViewStyle;
  testID?: string;
}
