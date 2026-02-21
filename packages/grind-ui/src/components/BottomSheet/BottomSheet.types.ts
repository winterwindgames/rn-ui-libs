import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  snapPoints?: number[];
  title?: string;
  showHandle?: boolean;
  children?: ReactNode;
  style?: ViewStyle;
  testID?: string;
}
