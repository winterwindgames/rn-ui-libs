import type { ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

export interface PopoverProps {
  visible?: boolean;
  anchor: ReactNode;
  content: ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  onClose?: () => void;
  style?: ViewStyle;
  testID?: string;
}
