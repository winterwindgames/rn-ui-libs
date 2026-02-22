import type { ViewStyle, ScrollViewProps } from 'react-native';
import type { ReactNode } from 'react';

export interface PullToRefreshProps extends ScrollViewProps {
  refreshing?: boolean;
  onRefresh?: () => void;
  children?: ReactNode;
  style?: ViewStyle;
  testID?: string;
}
