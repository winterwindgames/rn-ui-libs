import { ViewStyle } from 'react-native';

export type SegmentedControlSize = 'sm' | 'md' | 'lg';

export interface SegmentedControlProps {
  /** Segment labels */
  segments: string[];
  /** Currently selected index */
  selectedIndex?: number;
  /** Change handler */
  onChange?: (index: number) => void;
  /** Size */
  size?: SegmentedControlSize;
  /** Theme color key */
  color?: string;
  /** Style override */
  style?: ViewStyle;
  /** Test ID */
  testID?: string;
}
