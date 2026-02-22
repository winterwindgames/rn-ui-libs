import type { ViewStyle } from 'react-native';

export interface AlertAction {
  label: string;
  onPress: () => void;
  variant?: string;
}

export interface AlertProps {
  visible?: boolean;
  title?: string;
  message?: string;
  actions?: AlertAction[];
  onClose?: () => void;
  style?: ViewStyle;
  testID?: string;
}
