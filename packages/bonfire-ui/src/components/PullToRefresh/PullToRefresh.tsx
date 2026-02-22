import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { PullToRefreshProps } from './PullToRefresh.types';

export const PullToRefresh: React.FC<PullToRefreshProps> = ({
  refreshing = false, onRefresh, children, style, testID, ...rest
}) => {
  const { colors } = useTheme();

  return (
    <ScrollView testID={testID} style={style}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} colors={[colors.primary]} />}
      {...rest}>
      {children}
    </ScrollView>
  );
};
