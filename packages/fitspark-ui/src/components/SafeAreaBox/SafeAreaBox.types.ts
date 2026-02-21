import type { ViewStyle } from 'react-native';
import type { BoxProps } from '../Box/Box.types';

export interface SafeAreaBoxProps extends BoxProps {
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
  style?: ViewStyle;
  testID?: string;
}
