import { ReactNode } from 'react';
import { ViewStyle, StyleProp } from 'react-native';

export interface BottomSheetProps {
  visible: boolean;
  onDismiss?: () => void;
  children?: ReactNode;
  snapPoints?: number[];
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
