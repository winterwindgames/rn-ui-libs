import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { SpacerProps } from './Spacer.types';

export const Spacer: React.FC<SpacerProps> = ({
  size,
  horizontal = false,
  flex,
  testID,
}) => {
  const { spacing } = useTheme();

  const resolveSize = (): number => {
    if (size === undefined) return 0;
    if (typeof size === 'number') return size;
    return (spacing as Record<string, number>)[size] ?? 0;
  };

  const resolved = resolveSize();

  if (flex !== undefined) {
    return <View style={{ flex }} testID={testID} />;
  }

  return (
    <View
      style={{
        width: horizontal ? resolved : undefined,
        height: horizontal ? undefined : resolved,
      }}
      testID={testID}
    />
  );
};
