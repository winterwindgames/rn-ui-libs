import { ViewStyle, StyleProp } from 'react-native';

export interface AlertAction {
  label: string;
  onPress: () => void;
  variant?: 'default' | 'destructive' | 'cancel';
}

export interface AlertProps {
  visible: boolean;
  title: string;
  message?: string;
  actions?: AlertAction[];
  onDismiss?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
