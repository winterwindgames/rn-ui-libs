import type { ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

export type ModalSize = 'sm' | 'md' | 'lg' | 'full';

export interface ModalProps {
  visible?: boolean;
  onClose?: () => void;
  title?: string;
  showCloseButton?: boolean;
  size?: ModalSize;
  children?: ReactNode;
  style?: ViewStyle;
  testID?: string;
}
