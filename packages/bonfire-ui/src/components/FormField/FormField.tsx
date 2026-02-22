import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { FormFieldProps } from './FormField.types';

export const FormField: React.FC<FormFieldProps> = ({
  label, error, helperText, required, children, style, testID,
}) => {
  const { colors, typography, spacing } = useTheme();

  return (
    <View testID={testID} style={[{ marginBottom: spacing.md }, style]}>
      {label && (
        <Text style={{ color: error ? colors.error : colors.textSecondary, ...typography.label, marginBottom: spacing.xs }}>
          {label}{required && <Text style={{ color: colors.error }}> *</Text>}
        </Text>
      )}
      {children}
      {(error || helperText) && (
        <Text style={{ color: error ? colors.error : colors.textMuted, ...typography.caption, marginTop: spacing.xs }}>
          {error || helperText}
        </Text>
      )}
    </View>
  );
};
