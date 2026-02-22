import type { ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

export interface BottomSheetProps {
  visible?: boolean;
  snapPoints?: number[];
  onClose?: () => void;
  handle?: boolean;
  children?: ReactNode;
  style?: ViewStyle;
  testID?: string;
}
