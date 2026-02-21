import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export type RadioSize = 'sm' | 'md' | 'lg';

export interface RadioGroupProps {
  /** Currently selected value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Radio children */
  children: ReactNode;
}

export interface RadioProps {
  /** Radio value */
  value: string;
  /** Label text */
  label?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Size */
  size?: RadioSize;
  /** Style override */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
}
