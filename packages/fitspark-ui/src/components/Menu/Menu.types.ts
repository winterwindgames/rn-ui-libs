import type { ViewStyle } from 'react-native';

export interface MenuItem {
  label: string;
  icon?: React.ReactNode;
  onPress?: () => void;
  destructive?: boolean;
  disabled?: boolean;
}

export type MenuPlacement = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export interface MenuProps {
  trigger: React.ReactNode;
  items: MenuItem[];
  visible: boolean;
  onClose: () => void;
  placement?: MenuPlacement;
  style?: ViewStyle;
  testID?: string;
}
