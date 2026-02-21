import React, { useCallback, useState } from 'react';
import { ScrollView, RefreshControl, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { PullToRefreshProps } from './PullToRefresh.types';

export const PullToRefresh: React.FC<PullToRefreshProps> = ({
  children,
  onRefresh,
  refreshing: controlledRefreshing,
  style,
  testID = 'pull-to-refresh',
}) => {
  const { colors } = useTheme();
  const [internalRefreshing, setInternalRefreshing] = useState(false);

  const isRefreshing = controlledRefreshing ?? internalRefreshing;

  const handleRefresh = useCallback(async () => {
    setInternalRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setInternalRefreshing(false);
    }
  }, [onRefresh]);

  return (
    <ScrollView
      style={[styles.container, style]}
      testID={testID}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          tintColor={colors.accent}
          colors={[colors.accent]}
          progressBackgroundColor={colors.surface}
        />
      }
    >
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
