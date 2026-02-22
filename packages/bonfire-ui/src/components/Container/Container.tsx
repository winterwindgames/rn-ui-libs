import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { ContainerProps } from './Container.types';

export const Container: React.FC<ContainerProps> = ({
  maxWidth = 480, padding = 'md', style, children, testID,
}) => {
  const { spacing } = useTheme();
  const pad = typeof padding === 'string'
    ? (spacing as Record<string, number>)[padding] ?? 16
    : padding;

  return (
    <View
      testID={testID}
      style={[{ maxWidth, alignSelf: 'center', width: '100%', paddingHorizontal: pad }, style]}
    >
      {children}
    </View>
  );
};
