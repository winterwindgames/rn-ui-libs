import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface SwipeableAction {
  key: string;
  label: string;
  color: string;
  icon?: ReactNode;
  onPress: () => void;
}

export interface SwipeableProps {
  children: ReactNode;
  leftActions?: SwipeableAction[];
  rightActions?: SwipeableAction[];
  actionWidth?: number;
  overshootFriction?: number;
  style?: ViewStyle;
  testID?: string;
}
