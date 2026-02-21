import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export type PopoverPosition = 'top' | 'bottom' | 'left' | 'right';

export interface PopoverProps {
  visible: boolean;
  onClose: () => void;
  content: ReactNode;
  position?: PopoverPosition;
  children: ReactNode;
  style?: ViewStyle;
  testID?: string;
}
