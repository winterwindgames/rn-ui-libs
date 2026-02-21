import { ViewStyle } from 'react-native';

export type SwitchSize = 'sm' | 'md';

export interface SwitchProps {
  /** Toggle value */
  value?: boolean;
  /** Toggle handler */
  onToggle?: (value: boolean) => void;
  /** Label text */
  label?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Theme color key */
  color?: string;
  /** Size */
  size?: SwitchSize;
  /** Style override */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
}
