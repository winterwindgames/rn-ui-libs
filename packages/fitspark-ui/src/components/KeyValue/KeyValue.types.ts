import { ViewStyle, StyleProp } from 'react-native';

export interface KeyValuePair {
  label: string;
  value: string | number;
}

export interface KeyValueProps {
  pairs: KeyValuePair[];
  direction?: 'horizontal' | 'vertical';
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
