import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { FormFieldProps } from './FormField.types';

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  hint,
  required = false,
  children,
  style,
  labelStyle,
  testID = 'form-field',
}) => {
  const { colors, spacing, typography } = useTheme();

  return (
    <View style={[styles.container, { marginBottom: spacing.md }, style]} testID={testID}>
      {label ? (
        <View style={styles.labelRow}>
          <Text
            style={[
              styles.label,
              { color: colors.text, ...typography.caption, marginBottom: spacing.xs },
              labelStyle,
            ]}
          >
            {label}
            {required && (
              <Text style={{ color: colors.error ?? '#FF3B30' }}> *</Text>
            )}
          </Text>
        </View>
      ) : null}

      {children}

      {error ? (
        <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(150)}>
          <Text
            style={[
              styles.error,
              {
                color: colors.error ?? '#FF3B30',
                ...typography.caption,
                marginTop: spacing.xs,
              },
            ]}
            accessibilityRole="alert"
            testID={`${testID}-error`}
          >
            {error}
          </Text>
        </Animated.View>
      ) : hint ? (
        <Text
          style={[
            styles.hint,
            { color: colors.textMuted, ...typography.caption, marginTop: spacing.xs },
          ]}
        >
          {hint}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  error: {
    fontSize: 12,
  },
  hint: {
    fontSize: 12,
  },
});
