import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface SpeedDialAction {
  icon: ReactNode;
  label?: string;
  onPress: () => void;
  color?: string;
}

export type SpeedDialPosition = 'bottom-right' | 'bottom-left' | 'bottom-center';

export interface SpeedDialProps {
  icon: ReactNode;
  openIcon?: ReactNode;
  actions: SpeedDialAction[];
  open?: boolean;
  onToggle?: (open: boolean) => void;
  position?: SpeedDialPosition;
  overlay?: boolean;
  style?: ViewStyle;
  testID?: string;
}
