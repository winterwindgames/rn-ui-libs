import type { ViewStyle } from 'react-native';

export interface PinInputProps {
  length?: number;
  value?: string;
  onChangeText?: (text: string) => void;
  onComplete?: (code: string) => void;
  secure?: boolean;
  error?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  style?: ViewStyle;
  testID?: string;
}
