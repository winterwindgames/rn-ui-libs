import type { ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

export interface SwipeAction {
  label: string;
  color: string;
  onPress: () => void;
}

export interface SwipeableProps {
  leftActions?: SwipeAction[];
  rightActions?: SwipeAction[];
  children?: ReactNode;
  style?: ViewStyle;
  testID?: string;
}
