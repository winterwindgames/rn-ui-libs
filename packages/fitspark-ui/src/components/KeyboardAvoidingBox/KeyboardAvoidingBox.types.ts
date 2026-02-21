import type { KeyboardAvoidingViewProps, ViewStyle } from 'react-native';

export interface KeyboardAvoidingBoxProps extends KeyboardAvoidingViewProps {
  flex?: number;
  children?: React.ReactNode;
  style?: ViewStyle;
  testID?: string;
}
