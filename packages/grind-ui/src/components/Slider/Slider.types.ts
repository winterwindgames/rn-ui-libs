import { ViewStyle } from 'react-native';

export interface SliderProps {
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
  /** Theme color key */
  color?: string;
  /** Show current value label */
  showValue?: boolean;
  /** Style override */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
}
