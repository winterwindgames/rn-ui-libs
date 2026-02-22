import type { ViewStyle } from 'react-native';

export interface StepIndicatorProps {
  steps: string[];
  currentStep?: number;
  variant?: 'horizontal' | 'vertical';
  style?: ViewStyle;
  testID?: string;
}
