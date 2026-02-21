import { ReactNode } from 'react';
import { ViewStyle, ImageStyle, ImageSourcePropType } from 'react-native';

export interface ImageProps {
  source: ImageSourcePropType | { uri: string };
  aspectRatio?: number;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  fallback?: ReactNode;
  showSkeleton?: boolean;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
  style?: ViewStyle & ImageStyle;
  testID?: string;
  accessibilityLabel?: string;
}
