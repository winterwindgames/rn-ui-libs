import { ViewStyle } from 'react-native';

export type StepperSize = 'sm' | 'md' | 'lg';

export interface StepperProps {
  /** Current value */
  value?: number;
  /** Value change handler */
  onValueChange?: (value: number) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Disabled state */
  disabled?: boolean;
  /** Size */
  size?: StepperSize;
  /** Style override */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
}
