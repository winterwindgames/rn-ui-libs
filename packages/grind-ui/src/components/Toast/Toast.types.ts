import { ViewStyle } from 'react-native';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top' | 'bottom';

export interface ToastAction {
  label: string;
  onPress: () => void;
}

export interface ToastConfig {
  message: string;
  variant?: ToastVariant;
  action?: ToastAction;
  duration?: number;
  position?: ToastPosition;
  testID?: string;
}

export interface ToastProps extends ToastConfig {
  id: string;
  onDismiss: (id: string) => void;
  style?: ViewStyle;
}

export interface ToastContextValue {
  show: (config: ToastConfig) => void;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}
