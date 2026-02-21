import { ReactNode } from 'react';
import { ViewStyle, StyleProp } from 'react-native';

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface PopoverProps {
  visible: boolean;
  onDismiss?: () => void;
  content: ReactNode;
  placement?: PopoverPlacement;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
