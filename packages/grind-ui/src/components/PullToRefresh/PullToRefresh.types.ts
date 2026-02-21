import { ViewStyle } from 'react-native';
import { ReactNode } from 'react';

export interface PullToRefreshProps {
  refreshing: boolean;
  onRefresh: () => void;
  children: ReactNode;
  color?: string;
  style?: ViewStyle;
  testID?: string;
}
