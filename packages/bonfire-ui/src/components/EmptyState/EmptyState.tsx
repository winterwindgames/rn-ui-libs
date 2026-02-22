import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { EmptyStateProps } from './EmptyState.types';

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon, title, subtitle, message, action, style, testID,
}) => {
  const { colors, spacing, radii, typography } = useTheme();
  const desc = subtitle || message;

  return (
    <View testID={testID} style={[styles.container, { padding: spacing.xl }, style]}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text style={{ color: colors.text, ...typography.h5, textAlign: 'center', marginTop: spacing.md }}>{title}</Text>
      {desc && <Text style={{ color: colors.textSecondary, ...typography.body, textAlign: 'center', marginTop: spacing.xs }}>{desc}</Text>}
      {action && (
        <Pressable onPress={action.onPress} accessibilityRole="button"
          style={[styles.btn, { backgroundColor: colors.primary, borderRadius: radii.pill, marginTop: spacing.lg }]}>
          <Text style={{ color: colors.textInverse, fontWeight: '600' }}>{action.label}</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
  icon: { marginBottom: 4 },
  btn: { paddingHorizontal: 24, paddingVertical: 12 },
});
