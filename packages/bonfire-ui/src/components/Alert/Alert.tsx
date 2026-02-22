import React from 'react';
import { View, Text, Pressable, Modal, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { AlertProps } from './Alert.types';

export const Alert: React.FC<AlertProps> = ({
  visible = false, title, message, actions = [], onClose, style, testID,
}) => {
  const { colors, radii, spacing, typography, shadows } = useTheme();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: colors.overlay }]} onPress={onClose} />
      <View style={styles.wrapper}>
        <View testID={testID} style={[styles.dialog, { backgroundColor: colors.surface, borderRadius: radii.xl, padding: spacing.lg, ...shadows.lg }, style]}>
          {title && <Text style={{ color: colors.text, ...typography.h5, marginBottom: spacing.sm }}>{title}</Text>}
          {message && <Text style={{ color: colors.textSecondary, ...typography.body, marginBottom: spacing.lg }}>{message}</Text>}
          <View style={styles.actions}>
            {actions.map((a, i) => (
              <Pressable key={i} onPress={a.onPress} accessibilityRole="button"
                style={[styles.actionBtn, { backgroundColor: i === actions.length - 1 ? colors.primary : 'transparent', borderRadius: radii.pill }]}>
                <Text style={{ color: i === actions.length - 1 ? colors.textInverse : colors.primary, fontWeight: '600' }}>{a.label}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1, justifyContent: 'center', paddingHorizontal: 32 },
  dialog: {},
  actions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 8 },
  actionBtn: { paddingHorizontal: 20, paddingVertical: 10 },
});
