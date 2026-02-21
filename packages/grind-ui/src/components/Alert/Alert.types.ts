import { ViewStyle } from 'react-native';

export type AlertVariant = 'info' | 'danger' | 'warning';

export interface AlertProps {
  visible: boolean;
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: AlertVariant;
  style?: ViewStyle;
  testID?: string;
}
