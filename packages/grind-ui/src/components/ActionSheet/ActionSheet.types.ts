import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface ActionSheetOption {
  label: string;
  icon?: ReactNode;
  destructive?: boolean;
  onPress: () => void;
}

export interface ActionSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  options: ActionSheetOption[];
  cancelLabel?: string;
  style?: ViewStyle;
  testID?: string;
}
