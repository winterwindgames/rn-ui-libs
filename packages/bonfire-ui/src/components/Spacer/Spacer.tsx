import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { SpacerProps } from './Spacer.types';

export const Spacer: React.FC<SpacerProps> = ({ size, flex, horizontal = false, style, testID }) => {
  const { spacing } = useTheme();
  const resolved = typeof size === 'string'
    ? (spacing as Record<string, number>)[size] ?? 0
    : size ?? 0;

  return (
    <View
      testID={testID}
      style={[
        flex !== undefined
          ? { flex }
          : horizontal
            ? { width: resolved }
            : { height: resolved },
        style,
      ]}
    />
  );
};
