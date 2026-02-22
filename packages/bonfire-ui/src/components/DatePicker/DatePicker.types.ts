import type { ViewStyle } from 'react-native';

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  mode?: 'date' | 'time' | 'datetime';
  minDate?: Date;
  maxDate?: Date;
  style?: ViewStyle;
  testID?: string;
}
