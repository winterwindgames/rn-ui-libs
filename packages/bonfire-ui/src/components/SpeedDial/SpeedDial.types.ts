import { ViewStyle, ReactNode } from 'react-native';

export interface SpeedDialAction {
  icon: ReactNode;
  label: string;
  onPress: () => void;
}

export interface SpeedDialProps {
  icon: ReactNode;
  actions: SpeedDialAction[];
  color?: string;
  style?: ViewStyle;
  testID?: string;
}
