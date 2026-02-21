import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { FormGroupProps } from './FormGroup.types';

export const FormGroup: React.FC<FormGroupProps> = ({
  title,
  description,
  children,
  style,
  titleStyle,
  testID = 'form-group',
}) => {
  const { colors, spacing, radii, typography } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderRadius: radii.lg,
          padding: spacing.lg,
          marginBottom: spacing.lg,
          borderWidth: 1,
          borderColor: colors.border,
        },
        style,
      ]}
      testID={testID}
      accessibilityRole="none"
    >
      {title ? (
        <Text
          style={[
            styles.title,
            {
              color: colors.text,
              ...typography.heading3,
              marginBottom: description ? spacing.xs : spacing.md,
            },
            titleStyle,
          ]}
        >
          {title}
        </Text>
      ) : null}

      {description ? (
        <Text
          style={[
            styles.description,
            {
              color: colors.textMuted,
              ...typography.body,
              marginBottom: spacing.md,
            },
          ]}
        >
          {description}
        </Text>
      ) : null}

      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    fontWeight: '700',
  },
  description: {
    fontSize: 14,
  },
});
