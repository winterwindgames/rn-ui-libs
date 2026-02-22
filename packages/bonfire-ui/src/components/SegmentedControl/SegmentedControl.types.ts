import { ViewStyle } from 'react-native';

export interface SegmentedControlProps {
  segments: string[];
  selectedIndex: number;
  onChange: (index: number) => void;
  style?: ViewStyle;
  testID?: string;
}
