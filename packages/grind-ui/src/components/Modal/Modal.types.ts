import { ViewStyle } from 'react-native';
import { ReactNode } from 'react';

export type ModalSize = 'sm' | 'md' | 'lg' | 'full';

export interface ModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  closeButton?: boolean;
  size?: ModalSize;
  children?: ReactNode;
  style?: ViewStyle;
  testID?: string;
}
