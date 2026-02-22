import { ViewStyle } from 'react-native';

export interface StepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  style?: ViewStyle;
  testID?: string;
}
