import type { ViewStyle } from 'react-native';

export interface SpeedDialAction {
  icon: React.ReactNode;
  label?: string;
  onPress?: () => void;
  color?: string;
}

export type SpeedDialPosition = 'bottom-right' | 'bottom-left' | 'bottom-center';

export interface SpeedDialProps {
  icon: React.ReactNode;
  openIcon?: React.ReactNode;
  actions: SpeedDialAction[];
  open: boolean;
  onToggle: () => void;
  position?: SpeedDialPosition;
  overlay?: boolean;
  style?: ViewStyle;
  testID?: string;
}
