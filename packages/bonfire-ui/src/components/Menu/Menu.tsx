import React from 'react';
import { View, Text, Pressable, Modal, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { MenuProps } from './Menu.types';

export const Menu: React.FC<MenuProps> = ({
  trigger, items, visible = false, onClose, style, testID,
}) => {
  const { colors, radii, shadows, spacing, typography } = useTheme();

  return (
    <View testID={testID} style={style}>
      {trigger}
      {visible && (
        <Modal visible transparent animationType="fade" onRequestClose={onClose}>
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
          <View style={[styles.menu, { backgroundColor: colors.surface, borderRadius: radii.lg, ...shadows.md, padding: spacing.xs, marginTop: 100, marginHorizontal: spacing.lg }]}>
            {items.map((item, i) => (
              <Pressable key={i} onPress={item.disabled ? undefined : item.onPress}
                style={[styles.item, { opacity: item.disabled ? 0.5 : 1 }]}>
                {item.icon && <View style={{ marginRight: 10 }}>{item.icon}</View>}
                <Text style={{ color: item.destructive ? colors.error : colors.text, ...typography.body, flex: 1 }}>{item.label}</Text>
              </Pressable>
            ))}
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  menu: { position: 'absolute', top: 0, left: 0, right: 0 },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 16 },
});
