import { ViewStyle } from 'react-native';
import { ReactNode } from 'react';

export interface SwipeAction {
  label: string;
  color: string;
  onPress: () => void;
  icon?: ReactNode;
}

export interface SwipeableProps {
  leftActions?: SwipeAction[];
  rightActions?: SwipeAction[];
  children: ReactNode;
  style?: ViewStyle;
  testID?: string;
}
