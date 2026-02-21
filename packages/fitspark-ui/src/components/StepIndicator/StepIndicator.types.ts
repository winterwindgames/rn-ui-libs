import { ViewStyle } from 'react-native';

export interface StepIndicatorStep {
  label?: string;
}

export interface StepIndicatorProps {
  steps: StepIndicatorStep[];
  currentStep: number;
  style?: ViewStyle;
  testID?: string;
}
