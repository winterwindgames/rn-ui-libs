import type { ViewStyle, PressableProps as RNPressableProps } from 'react-native';
import type { ReactNode } from 'react';

export interface PressableProps extends Omit<RNPressableProps, 'children'> {
  scaleOnPress?: number;
  opacityOnPress?: number;
  children?: ReactNode;
  style?: ViewStyle;
  testID?: string;
}
