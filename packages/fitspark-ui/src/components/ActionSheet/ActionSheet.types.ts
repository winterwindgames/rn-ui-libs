import { ReactNode } from 'react';
import { ViewStyle, StyleProp } from 'react-native';

export interface ActionSheetOption {
  label: string;
  onPress: () => void;
  icon?: ReactNode;
  destructive?: boolean;
  disabled?: boolean;
}

export interface ActionSheetProps {
  visible: boolean;
  title?: string;
  message?: string;
  options: ActionSheetOption[];
  cancelLabel?: string;
  onDismiss?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
