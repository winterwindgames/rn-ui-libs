import { ViewStyle, ReactNode } from 'react-native';

export interface TimelineItem {
  title: string;
  description?: string;
  time?: string;
  icon?: ReactNode;
  color?: string;
}

export interface TimelineProps {
  items: TimelineItem[];
  style?: ViewStyle;
  testID?: string;
}
