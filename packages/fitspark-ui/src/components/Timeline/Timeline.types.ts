import { ReactNode } from 'react';
import { ViewStyle, StyleProp } from 'react-native';

export interface TimelineItem {
  id: string;
  title: string;
  description?: string;
  time?: string;
  icon?: ReactNode;
  color?: string;
}

export interface TimelineProps {
  items: TimelineItem[];
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
