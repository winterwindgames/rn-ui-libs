import { ViewStyle } from 'react-native';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

export interface ToastProps {
  visible: boolean;
  message: string;
  variant?: ToastVariant;
  duration?: number;
  onDismiss?: () => void;
  style?: ViewStyle;
  testID?: string;
}
