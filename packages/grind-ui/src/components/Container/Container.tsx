import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { ContainerProps } from './Container.types';

export const Container: React.FC<ContainerProps> = ({
  maxWidth = 960,
  padding,
  style,
  children,
  testID,
  accessible,
  accessibilityLabel,
}) => {
  const { spacing } = useTheme();

  const resolveSpacing = (value: string | number | undefined): number | undefined => {
    if (value === undefined) return undefined;
    if (typeof value === 'number') return value;
    return (spacing as Record<string, number>)[value] ?? undefined;
  };

  return (
    <View
      style={[
        {
          width: '100%',
          maxWidth,
          alignSelf: 'center',
          padding: resolveSpacing(padding),
        },
        style,
      ]}
      testID={testID}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
    >
      {children}
    </View>
  );
};
