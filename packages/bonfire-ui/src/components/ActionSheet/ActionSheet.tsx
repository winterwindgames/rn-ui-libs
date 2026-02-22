import React from 'react';
import { View, Text, Pressable, Modal, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { ActionSheetProps } from './ActionSheet.types';

export const ActionSheet: React.FC<ActionSheetProps> = ({
  visible = false, title, options, cancelLabel = 'Cancel', onClose, style, testID,
}) => {
  const { colors, radii, spacing, typography } = useTheme();

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: colors.overlay }]} onPress={onClose} />
      <View style={styles.wrapper}>
        <View testID={testID} style={[styles.sheet, { backgroundColor: colors.surface, borderRadius: radii.xl, padding: spacing.sm }, style]}>
          {title && <Text style={{ color: colors.textSecondary, ...typography.caption, textAlign: 'center', paddingVertical: spacing.sm }}>{title}</Text>}
          {options.map((opt, i) => (
            <Pressable key={i} onPress={opt.onPress} accessibilityRole="button"
              style={[styles.option, { borderTopWidth: i > 0 ? 0.5 : 0, borderTopColor: colors.borderLight }]}>
              <Text style={{ color: opt.destructive ? colors.error : colors.text, ...typography.body, textAlign: 'center', fontWeight: '500' }}>{opt.label}</Text>
            </Pressable>
          ))}
        </View>
        <Pressable onPress={onClose} style={[styles.cancel, { backgroundColor: colors.surface, borderRadius: radii.xl }]}>
          <Text style={{ color: colors.primary, ...typography.body, fontWeight: '600', textAlign: 'center' }}>{cancelLabel}</Text>
        </Pressable>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 8, paddingBottom: 34 },
  sheet: { overflow: 'hidden' },
  option: { paddingVertical: 16 },
  cancel: { marginTop: 8, paddingVertical: 16 },
});
