import type { ViewStyle } from 'react-native';

export interface SpacerProps {
  size?: string | number;
  flex?: number;
  horizontal?: boolean;
  style?: ViewStyle;
  testID?: string;
}
