import React, { useState, useRef, useCallback } from 'react';
import { Modal, Pressable, View, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../Text/Text';
import type { SelectProps } from './Select.types';

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  disabled = false,
  style,
  testID,
}) => {
  const { colors, spacing, radii, sizes, shadows } = useTheme();
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0, w: 0 });
  const triggerRef = useRef<View>(null);
  const selected = options.find((o) => o.value === value);

  const handleOpen = useCallback(() => {
    if (disabled) return;
    triggerRef.current?.measureInWindow((x, y, w, h) => {
      setPos({ x, y: y + h + 4, w });
      setOpen(true);
    });
  }, [disabled]);

  return (
    <>
      <Pressable
        ref={triggerRef}
        testID={testID}
        onPress={handleOpen}
        accessibilityRole="button"
        accessibilityLabel={selected?.label ?? placeholder}
        style={[
          styles.trigger,
          {
            height: sizes.inputHeight.md,
            backgroundColor: colors.inputBackground,
            borderRadius: radii.md,
            borderWidth: 1,
            borderColor: colors.border,
            paddingHorizontal: spacing.md,
            opacity: disabled ? 0.5 : 1,
          },
          style,
        ]}
      >
        <Text variant="body" color={selected ? colors.text : colors.textMuted} style={{ flex: 1 }}>
          {selected?.label ?? placeholder}
        </Text>
        <Text style={{ color: colors.textMuted, fontSize: 12 }}>▼</Text>
      </Pressable>
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={StyleSheet.absoluteFill} onPress={() => setOpen(false)} />
        <View style={[styles.dropdown, { top: pos.y, left: pos.x, width: pos.w, backgroundColor: colors.surfaceElevated, borderRadius: radii.md, maxHeight: 250 }, shadows.md]}>
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => { onChange(item.value); setOpen(false); }}
                accessibilityRole="menuitem"
                style={[styles.option, { paddingVertical: spacing.sm, paddingHorizontal: spacing.md, backgroundColor: item.value === value ? colors.primary + '20' : 'transparent' }]}
              >
                <Text variant="body" color={item.value === value ? colors.primary : colors.text}>{item.label}</Text>
              </Pressable>
            )}
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  trigger: { flexDirection: 'row', alignItems: 'center' },
  dropdown: { position: 'absolute', overflow: 'hidden' },
  option: {},
});
