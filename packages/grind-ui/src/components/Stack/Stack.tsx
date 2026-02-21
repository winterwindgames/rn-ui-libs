import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { StackProps } from './Stack.types';

export const Stack: React.FC<StackProps> = ({
  direction = 'column',
  gap,
  align,
  justify,
  wrap,
  style,
  children,
  testID,
  accessible,
  accessibilityLabel,
  accessibilityRole,
}) => {
  const { spacing } = useTheme();

  const resolveGap = (value: string | number | undefined): number | undefined => {
    if (value === undefined) return undefined;
    if (typeof value === 'number') return value;
    return (spacing as Record<string, number>)[value] ?? undefined;
  };

  const stackStyle = {
    flexDirection: direction as ViewStyle['flexDirection'],
    gap: resolveGap(gap),
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap ? ('wrap' as const) : undefined,
  };

  return (
    <View
      style={[stackStyle, style]}
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole={accessibilityRole as any}
    >
      {children}
    </View>
  );
};

export const HStack: React.FC<Omit<StackProps, 'direction'>> = (props) => (
  <Stack {...props} direction="row" />
);

export const VStack: React.FC<Omit<StackProps, 'direction'>> = (props) => (
  <Stack {...props} direction="column" />
);
