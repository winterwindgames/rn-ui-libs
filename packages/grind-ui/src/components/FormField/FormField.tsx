import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { FormFieldProps } from './FormField.types';

export const FormField: React.FC<FormFieldProps> = ({
  label,
  helperText,
  error = false,
  errorMessage,
  required = false,
  children,
  style,
  testID,
}) => {
  const { colors, spacing, typography } = useTheme();

  return (
    <View testID={testID} style={[styles.container, { marginBottom: spacing.md }, style]}>
      {label && (
        <Text
          style={[
            styles.label,
            {
              color: error ? (colors.error ?? colors.error ?? '#E37461') : colors.text,
              fontSize: typography.bodySm.fontSize,
              fontWeight: typography.h1.fontWeight as any,
              textTransform: 'uppercase',
              letterSpacing: 1.2,
              marginBottom: spacing.xs,
            },
          ]}
          accessibilityRole="text"
        >
          {label}
          {required && (
            <Text style={{ color: colors.error ?? colors.error ?? '#E37461' }}> *</Text>
          )}
        </Text>
      )}

      {children}

      {error && errorMessage ? (
        <Text
          style={[
            styles.helperText,
            {
              color: colors.error ?? colors.error ?? '#E37461',
              fontSize: typography.caption.fontSize,
              marginTop: spacing.xs,
            },
          ]}
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
        >
          {errorMessage}
        </Text>
      ) : helperText ? (
        <Text
          style={[
            styles.helperText,
            {
              color: colors.textSecondary,
              fontSize: typography.caption.fontSize,
              marginTop: spacing.xs,
            },
          ]}
        >
          {helperText}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  label: {},
  helperText: {},
});
