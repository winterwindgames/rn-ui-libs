import { ReactNode } from 'react';
import { ViewStyle, StyleProp } from 'react-native';

export interface TimelineItem {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  color?: string;
  time?: string;
}

export interface TimelineProps {
  items: TimelineItem[];
  lineColor?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
