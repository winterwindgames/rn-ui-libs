import type { ViewStyle } from 'react-native';

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  minimumDate?: Date;
  maximumDate?: Date;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  format?: (date: Date) => string;
  style?: ViewStyle;
  testID?: string;
}
