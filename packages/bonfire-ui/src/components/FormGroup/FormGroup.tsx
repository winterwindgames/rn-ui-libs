import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { FormGroupProps } from './FormGroup.types';

export const FormGroup: React.FC<FormGroupProps> = ({ title, error, children, style, testID }) => {
  const { colors, typography, spacing } = useTheme();

  return (
    <View testID={testID} style={[{ marginBottom: spacing.lg }, style]}>
      {title && <Text style={{ color: colors.text, ...typography.h6, marginBottom: spacing.md }}>{title}</Text>}
      {children}
      {error && <Text style={{ color: colors.error, ...typography.caption, marginTop: spacing.xs }}>{error}</Text>}
    </View>
  );
};
