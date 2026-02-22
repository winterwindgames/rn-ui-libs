import type { ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

export interface MenuItem {
  label: string;
  icon?: ReactNode;
  onPress: () => void;
  destructive?: boolean;
  disabled?: boolean;
}

export interface MenuProps {
  trigger: ReactNode;
  items: MenuItem[];
  visible?: boolean;
  onClose?: () => void;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  style?: ViewStyle;
  testID?: string;
}
