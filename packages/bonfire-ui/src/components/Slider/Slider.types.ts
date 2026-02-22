import { ViewStyle } from 'react-native';

export interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  color?: string;
  style?: ViewStyle;
  testID?: string;
}
