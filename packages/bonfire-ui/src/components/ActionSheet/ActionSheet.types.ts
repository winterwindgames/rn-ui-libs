import type { ViewStyle } from 'react-native';

export interface ActionSheetOption {
  label: string;
  onPress: () => void;
  destructive?: boolean;
}

export interface ActionSheetProps {
  visible?: boolean;
  title?: string;
  options: ActionSheetOption[];
  cancelLabel?: string;
  onClose?: () => void;
  style?: ViewStyle;
  testID?: string;
}
