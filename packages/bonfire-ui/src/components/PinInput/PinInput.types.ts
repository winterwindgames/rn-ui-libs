import type { ViewStyle } from 'react-native';

export interface PinInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  secure?: boolean;
  autoFocus?: boolean;
  style?: ViewStyle;
  testID?: string;
}
