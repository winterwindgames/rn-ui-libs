import React from 'react';
import { ScrollView, RefreshControl, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { PullToRefreshProps } from './PullToRefresh.types';

export const PullToRefresh: React.FC<PullToRefreshProps> = ({
  refreshing,
  onRefresh,
  children,
  color,
  style,
  testID,
}) => {
  const { colors } = useTheme();
  const tintColor = color ?? colors.primary;

  return (
    <ScrollView
      testID={testID}
      style={[styles.container, style]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={tintColor}
          colors={[tintColor]}
          progressBackgroundColor={colors.surface}
        />
      }
      accessibilityRole="scrollbar"
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
