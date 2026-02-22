import { ViewStyle } from 'react-native';

export interface StatProps {
  value: string | number;
  label: string;
  helpText?: string;
  trend?: 'up' | 'down' | 'neutral';
  style?: ViewStyle;
  testID?: string;
}
