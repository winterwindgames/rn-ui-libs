import { ViewStyle } from 'react-native';

export interface ColorPickerProps {
  /** Available colors */
  colors: string[];
  /** Currently selected color */
  value?: string;
  /** Change handler */
  onChange?: (color: string) => void;
  /** Grid columns */
  columns?: number;
  /** Swatch size */
  size?: number;
  /** Style override */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
}
