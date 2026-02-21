import { ViewStyle } from 'react-native';

export type DatePickerMode = 'date' | 'time' | 'datetime';

export interface DatePickerProps {
  /** Selected date */
  value?: Date;
  /** Change handler */
  onChange?: (date: Date) => void;
  /** Picker mode */
  mode?: DatePickerMode;
  /** Minimum selectable date */
  minimumDate?: Date;
  /** Maximum selectable date */
  maximumDate?: Date;
  /** Label above picker trigger */
  label?: string;
  /** Style override */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
}
