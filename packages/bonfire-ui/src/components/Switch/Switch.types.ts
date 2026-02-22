import { ViewStyle } from 'react-native';

export interface SwitchProps {
  value: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
  color?: string;
  style?: ViewStyle;
  testID?: string;
}
