import { ViewStyle, StyleProp } from 'react-native';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastConfig {
  id: string;
  message: string;
  type?: ToastType;
  duration?: number;
  action?: { label: string; onPress: () => void };
}

export interface ToastProviderProps {
  children: React.ReactNode;
}

export interface ToastItemProps {
  toast: ToastConfig;
  onDismiss: (id: string) => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export interface ToastContextValue {
  show: (config: Omit<ToastConfig, 'id'>) => void;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}
