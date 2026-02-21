import { ViewStyle } from 'react-native';

export interface PinInputProps {
  /** Number of input boxes */
  length?: 4 | 5 | 6;
  /** Current value */
  value?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Called when all digits filled */
  onComplete?: (value: string) => void;
  /** Mask digits */
  secureEntry?: boolean;
  /** Error state */
  error?: boolean;
  /** Auto-focus first box */
  autoFocus?: boolean;
  /** Style override */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
}
