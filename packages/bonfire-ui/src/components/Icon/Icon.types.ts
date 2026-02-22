import type { ViewStyle } from 'react-native';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface IconProps {
  name: string;
  size?: IconSize | number;
  color?: string;
  style?: ViewStyle;
  testID?: string;
}
