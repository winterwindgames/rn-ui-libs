import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export type DrawerSide = 'left' | 'right';

export interface DrawerProps {
  visible: boolean;
  onClose: () => void;
  side?: DrawerSide;
  width?: number | string;
  header?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
  overlay?: boolean;
  style?: ViewStyle;
  testID?: string;
}
