import { ReactNode } from 'react';
import { ViewStyle, StyleProp } from 'react-native';

export interface ModalProps {
  visible: boolean;
  onDismiss?: () => void;
  children?: ReactNode;
  dismissOnBackdrop?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
