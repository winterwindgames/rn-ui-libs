import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: string;
  position?: TooltipPosition;
  children: ReactNode;
  style?: ViewStyle;
  testID?: string;
}
