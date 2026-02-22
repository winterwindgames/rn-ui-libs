import React from 'react';
import { View, Text, Pressable, Modal as RNModal, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { ModalProps, ModalSize } from './Modal.types';

const WIDTH_MAP: Record<ModalSize, number | string> = { sm: 300, md: 380, lg: 440, full: '95%' };

export const Modal: React.FC<ModalProps> = ({
  visible = false, onClose, title, showCloseButton = true, size = 'md', children, style, testID,
}) => {
  const { colors, radii, spacing, typography, shadows } = useTheme();
  const w = WIDTH_MAP[size];

  return (
    <RNModal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: colors.overlay }]} onPress={onClose} />
      <View style={styles.wrapper}>
        <View testID={testID} style={[styles.modal, { backgroundColor: colors.surface, borderRadius: radii.xl, padding: spacing.lg, width: w as any, ...shadows.lg }, style]}>
          {(title || showCloseButton) && (
            <View style={styles.header}>
              {title && <Text style={{ color: colors.text, ...typography.h5, flex: 1 }}>{title}</Text>}
              {showCloseButton && (
                <Pressable onPress={onClose} accessibilityLabel="Close" hitSlop={8}>
                  <Text style={{ color: colors.textMuted, fontSize: 20 }}>✕</Text>
                </Pressable>
              )}
            </View>
          )}
          {children}
        </View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  modal: { maxHeight: '80%' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
});
