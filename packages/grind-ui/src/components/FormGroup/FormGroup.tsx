import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { FormGroupProps } from './FormGroup.types';

export const FormGroup: React.FC<FormGroupProps> = ({
  title,
  subtitle,
  children,
  style,
  testID,
}) => {
  const { colors, spacing, typography, radii } = useTheme();

  return (
    <View
      testID={testID}
      accessibilityRole="summary"
      style={[
        styles.container,
        {
          backgroundColor: colors.surfaceElevated ?? colors.surface,
          borderRadius: radii.lg,
          padding: spacing.lg,
          marginBottom: spacing.lg,
        },
        style,
      ]}
    >
      {title && (
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
              fontSize: typography.h4.fontSize,
              fontWeight: typography.h1.fontWeight as any,
              textTransform: 'uppercase',
              letterSpacing: 1.2,
              marginBottom: subtitle ? spacing.xs : spacing.md,
            },
          ]}
        >
          {title}
        </Text>
      )}
      {subtitle && (
        <Text
          style={[
            styles.subtitle,
            {
              color: colors.textSecondary,
              fontSize: typography.bodySm.fontSize,
              fontWeight: typography.body.fontWeight as any,
              marginBottom: spacing.md,
            },
          ]}
        >
          {subtitle}
        </Text>
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {},
  subtitle: {},
});
