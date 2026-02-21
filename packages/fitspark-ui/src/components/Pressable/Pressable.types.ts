import type { ViewStyle, PressableProps as RNPressableProps } from 'react-native';

export interface PressableProps extends Omit<RNPressableProps, 'style'> {
  scaleValue?: number;
  opacityValue?: number;
  disabled?: boolean;
  children?: React.ReactNode;
  style?: ViewStyle;
  testID?: string;
}
