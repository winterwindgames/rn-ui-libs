import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { EmptyStateProps } from './EmptyState.types';

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  subtitle,
  actionLabel,
  onAction,
  style,
  testID,
}) => {
  const { colors, spacing, typography, radii } = useTheme();

  return (
    <View
      style={[styles.container, { padding: spacing.xl }, style]}
      testID={testID}
      accessibilityRole="none"
      accessibilityLabel={`${title}${subtitle ? `. ${subtitle}` : ''}`}
    >
      {icon && <View style={[styles.iconWrap, { marginBottom: spacing.md }]}>{icon}</View>}
      <Text
        style={[
          typography.h5,
          {
            color: colors.text,
            textAlign: 'center',
            fontWeight: '700',
          },
        ]}
      >
        {title}
      </Text>
      {subtitle && (
        <Text
          style={[
            typography.body,
            {
              color: colors.textSecondary,
              textAlign: 'center',
              marginTop: spacing.xs,
              maxWidth: 280,
            },
          ]}
        >
          {subtitle}
        </Text>
      )}
      {actionLabel && onAction && (
        <Pressable
          onPress={onAction}
          style={({ pressed }) => [
            styles.action,
            {
              backgroundColor: colors.primary,
              borderRadius: radii.full ?? 999,
              paddingVertical: spacing.sm,
              paddingHorizontal: spacing.lg,
              marginTop: spacing.lg,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
          accessibilityRole="button"
          accessibilityLabel={actionLabel}
        >
          <Text style={[styles.actionText, { color: '#FFFFFF' }]}>{actionLabel}</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrap: {
    alignItems: 'center',
  },
  action: {},
  actionText: {
    fontWeight: '700',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
