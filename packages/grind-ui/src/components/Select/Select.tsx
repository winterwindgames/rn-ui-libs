import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { SelectProps, SelectOption } from './Select.types';

export const Select: React.FC<SelectProps> = ({
  label,
  value,
  options,
  onSelect,
  placeholder = 'Select…',
  disabled = false,
  error = false,
  style,
  testID,
}) => {
  const { colors, radii, typography, spacing } = useTheme();
  const [open, setOpen] = useState(false);

  const selectedOption = options.find((o) => o.value === value);

  const handleSelect = useCallback(
    (option: SelectOption) => {
      onSelect?.(option.value);
      setOpen(false);
    },
    [onSelect],
  );

  const borderColor = error
    ? (colors.error ?? '#E37461')
    : (colors.border ?? '#3a3a3a');

  return (
    <View style={[styles.container, style]} testID={testID}>
      {label && (
        <Text
          style={[
            styles.label,
            {
              color: error ? (colors.error ?? '#E37461') : (colors.textSecondary ?? '#aaa'),
              fontFamily: typography.body.fontFamily ?? undefined,
              marginBottom: spacing.xs ?? 4,
            },
          ]}
        >
          {label}
        </Text>
      )}

      <Pressable
        onPress={() => !disabled && setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={label ?? placeholder}
        accessibilityState={{ disabled, expanded: open }}
        style={[
          styles.trigger,
          {
            borderRadius: radii.md ?? 12,
            borderColor,
            borderWidth: 1.5,
            backgroundColor: colors.surface ?? '#272727',
            opacity: disabled ? 0.5 : 1,
          },
        ]}
      >
        <Text
          style={[
            styles.triggerText,
            {
              color: selectedOption ? (colors.text ?? '#F8FBFC') : (colors.textSecondary ?? '#666'),
              fontFamily: typography.body.fontFamily ?? undefined,
            },
          ]}
          numberOfLines={1}
        >
          {selectedOption?.label ?? placeholder}
        </Text>
        <Text style={[styles.chevron, { color: colors.textSecondary ?? '#666' }]}>▾</Text>
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="slide"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <SafeAreaView style={styles.sheetSafe}>
            <View
              style={[
                styles.sheet,
                {
                  backgroundColor: colors.surface ?? '#272727',
                  borderTopLeftRadius: radii.lg ?? 20,
                  borderTopRightRadius: radii.lg ?? 20,
                },
              ]}
            >
              <View style={styles.handle}>
                <View
                  style={[
                    styles.handleBar,
                    { backgroundColor: colors.border ?? '#3a3a3a' },
                  ]}
                />
              </View>

              {label && (
                <Text
                  style={[
                    styles.sheetTitle,
                    {
                      color: colors.text ?? '#F8FBFC',
                      fontFamily: typography.h1.fontFamily ?? undefined,
                    },
                  ]}
                >
                  {label}
                </Text>
              )}

              <FlatList
                data={options}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => {
                  const isSelected = item.value === value;
                  return (
                    <Pressable
                      onPress={() => handleSelect(item)}
                      style={[
                        styles.option,
                        {
                          backgroundColor: isSelected
                            ? ((colors.primary ?? '#787AF3') + '20')
                            : 'transparent',
                        },
                      ]}
                      accessibilityRole="radio"
                      accessibilityState={{ selected: isSelected }}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          {
                            color: isSelected
                              ? (colors.primary ?? '#787AF3')
                              : (colors.text ?? '#F8FBFC'),
                            fontFamily: isSelected
                              ? (typography.h1.fontFamily ?? undefined)
                              : (typography.body.fontFamily ?? undefined),
                          },
                        ]}
                      >
                        {item.label}
                      </Text>
                      {isSelected && (
                        <Text style={{ color: colors.primary ?? '#787AF3', fontSize: 16 }}>✓</Text>
                      )}
                    </Pressable>
                  );
                }}
                style={styles.list}
              />
            </View>
          </SafeAreaView>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    paddingHorizontal: 16,
  },
  triggerText: {
    flex: 1,
    fontSize: 15,
  },
  chevron: {
    fontSize: 16,
    marginLeft: 8,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheetSafe: {
    maxHeight: '60%',
  },
  sheet: {
    paddingBottom: 20,
  },
  handle: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  handleBar: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  sheetTitle: {
    fontSize: 17,
    fontWeight: '700',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  list: {
    maxHeight: 300,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  optionText: {
    fontSize: 16,
  },
});
