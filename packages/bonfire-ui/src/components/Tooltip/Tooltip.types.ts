import { ViewStyle, ReactNode } from 'react-native';

export interface TooltipProps {
  content: string;
  children: ReactNode;
  placement?: 'top' | 'bottom';
  style?: ViewStyle;
  testID?: string;
}
