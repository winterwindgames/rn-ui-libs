import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface PullToRefreshProps {
  children: ReactNode;
  onRefresh: () => Promise<void> | void;
  refreshing?: boolean;
  style?: ViewStyle;
  testID?: string;
}
