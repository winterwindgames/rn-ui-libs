import type { ViewStyle } from 'react-native';

export type DrawerSide = 'left' | 'right';

export interface DrawerProps {
  visible: boolean;
  onClose: () => void;
  side?: DrawerSide;
  width?: number | string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  overlay?: boolean;
  style?: ViewStyle;
  testID?: string;
}
