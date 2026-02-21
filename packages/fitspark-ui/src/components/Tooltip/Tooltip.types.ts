import { ReactNode } from 'react';
import { ViewStyle, StyleProp } from 'react-native';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: string;
  placement?: TooltipPlacement;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
