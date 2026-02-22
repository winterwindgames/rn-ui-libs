import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { StackProps } from './Stack.types';

const resolveGap = (gap: string | number | undefined, spacing: Record<string, number>): number | undefined => {
  if (gap === undefined) return undefined;
  if (typeof gap === 'number') return gap;
  return spacing[gap] ?? undefined;
};

export const VStack: React.FC<StackProps> = ({ gap, align, justify, wrap, style, children, testID }) => {
  const { spacing } = useTheme();
  return (
    <View
      testID={testID}
      style={[
        {
          flexDirection: 'column',
          gap: resolveGap(gap, spacing as Record<string, number>),
          alignItems: align,
          justifyContent: justify,
          flexWrap: wrap ? 'wrap' : undefined,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export const HStack: React.FC<StackProps> = ({ gap, align, justify, wrap, style, children, testID }) => {
  const { spacing } = useTheme();
  return (
    <View
      testID={testID}
      style={[
        {
          flexDirection: 'row',
          gap: resolveGap(gap, spacing as Record<string, number>),
          alignItems: align,
          justifyContent: justify,
          flexWrap: wrap ? 'wrap' : undefined,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export const Stack = VStack;
