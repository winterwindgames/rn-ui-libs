import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { SpacerProps } from './Spacer.types';

export const Spacer: React.FC<SpacerProps> = ({ size = 'md', horizontal = false, flex, testID }) => {
  const { theme } = useTheme();
  const resolved = typeof size === 'number' ? size : theme.spacing[size];

  if (flex !== undefined) {
    return <View style={{ flex }} testID={testID} />;
  }

  return (
    <View
      style={horizontal ? { width: resolved } : { height: resolved }}
      testID={testID}
      accessibilityElementsHidden
      importantForAccessibility="no"
    />
  );
};
