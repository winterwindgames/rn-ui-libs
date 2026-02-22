import type { ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

export interface DrawerProps {
  visible?: boolean;
  onClose?: () => void;
  side?: 'left' | 'right';
  width?: number | string;
  header?: ReactNode;
  footer?: ReactNode;
  overlay?: boolean;
  children?: ReactNode;
  style?: ViewStyle;
  testID?: string;
}
