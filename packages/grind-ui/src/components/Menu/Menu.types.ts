import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface MenuItem {
  label: string;
  icon?: ReactNode;
  onPress: () => void;
  destructive?: boolean;
  disabled?: boolean;
}

export type MenuPlacement = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';

export interface MenuProps {
  trigger: ReactNode;
  items: MenuItem[];
  visible: boolean;
  onClose: () => void;
  placement?: MenuPlacement;
  style?: ViewStyle;
  testID?: string;
}
