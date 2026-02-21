import React, { useState, useCallback } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../Text';
import type { SelectProps, SelectOption } from './Select.types';

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onValueChange,
  placeholder = 'Select...',
  label,
  error,
  disabled = false,
  style,
  testID,
}) => {
  const { theme } = useTheme();
  const { colors, spacing, radii, sizes } = theme;
  const [open, setOpen] = useState(false);

  const selected = options.find((o) => o.value === value);

  const handleSelect = useCallback(
    (opt: SelectOption) => {
      onValueChange?.(opt.value);
      setOpen(false);
    },
    [onValueChange],
  );

  const triggerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: sizes.inputHeight.md,
    backgroundColor: colors.inputBackground,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: error ? colors.error : colors.border,
    paddingHorizontal: spacing.md,
    opacity: disabled ? 0.5 : 1,
  };

  return (
    <View style={{ gap: spacing.xs }} testID={testID}>
      {label && <Text variant="label" color="textSecondary">{label}</Text>}
      <TouchableOpacity
        style={[triggerStyle, style]}
        onPress={() => !disabled && setOpen(true)}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={label ?? placeholder}
        accessibilityState={{ disabled, expanded: open }}
      >
        <Text variant="body" color={selected ? 'text' : 'textMuted'}>
          {selected?.label ?? placeholder}
        </Text>
        <Text variant="body" color="textMuted">▾</Text>
      </TouchableOpacity>
      {error && <Text variant="caption" color="error">{error}</Text>}

      <Modal visible={open} transparent animationType="slide" onRequestClose={() => setOpen(false)}>
        <View style={{ flex: 1, backgroundColor: colors.overlay, justifyContent: 'flex-end' }}>
          <SafeAreaView style={{ backgroundColor: colors.surface, borderTopLeftRadius: radii.xl, borderTopRightRadius: radii.xl, maxHeight: '60%' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}>
              <Text variant="h5">{label ?? 'Select'}</Text>
              <TouchableOpacity onPress={() => setOpen(false)} accessibilityRole="button" accessibilityLabel="Close">
                <Text variant="body" color="textMuted">Done</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => !item.disabled && handleSelect(item)}
                  style={{
                    padding: spacing.md,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    opacity: item.disabled ? 0.4 : 1,
                    backgroundColor: item.value === value ? colors.surfaceElevated : 'transparent',
                  }}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: item.value === value, disabled: item.disabled }}
                >
                  <Text variant="body">{item.label}</Text>
                  {item.value === value && <Text variant="body" color="primary">✓</Text>}
                </TouchableOpacity>
              )}
            />
          </SafeAreaView>
        </View>
      </Modal>
    </View>
  );
};
