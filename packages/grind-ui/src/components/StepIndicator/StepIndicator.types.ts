import { ViewStyle } from 'react-native';

export interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
  completedColor?: string;
  style?: ViewStyle;
  testID?: string;
}
