import React from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { ScrollBoxProps } from './ScrollBox.types';

export const ScrollBox: React.FC<ScrollBoxProps> = ({
  padding,
  bg,
  horizontal = false,
  showsScrollIndicator = false,
  refreshing,
  onRefresh,
  style,
  contentContainerStyle,
  children,
  testID,
  accessible,
  accessibilityLabel,
}) => {
  const { colors, spacing } = useTheme();

  const resolveSpacing = (value: string | number | undefined): number | undefined => {
    if (value === undefined) return undefined;
    if (typeof value === 'number') return value;
    return (spacing as Record<string, number>)[value] ?? undefined;
  };

  const resolveColor = (value: string | undefined): string | undefined => {
    if (value === undefined) return undefined;
    return (colors as Record<string, string>)[value] ?? value;
  };

  const refreshControl =
    refreshing !== undefined && onRefresh ? (
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    ) : undefined;

  return (
    <ScrollView
      style={[{ backgroundColor: resolveColor(bg) }, style]}
      contentContainerStyle={[{ padding: resolveSpacing(padding) }, contentContainerStyle]}
      horizontal={horizontal}
      showsHorizontalScrollIndicator={horizontal ? showsScrollIndicator : undefined}
      showsVerticalScrollIndicator={horizontal ? undefined : showsScrollIndicator}
      refreshControl={refreshControl}
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
    >
      {children}
    </ScrollView>
  );
};
