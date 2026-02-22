import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../Text/Text';
import type { ToggleGroupProps } from './ToggleGroup.types';

export const ToggleGroup: React.FC<ToggleGroupProps> = ({
  options,
  value,
  onChange,
  style,
  testID,
}) => {
  const { colors, spacing, radii } = useTheme();

  return (
    <View testID={testID} style={[styles.container, { backgroundColor: colors.surfaceElevated, borderRadius: radii.md, padding: 2 }, style]}>
      {options.map((opt) => {
        const selected = opt.value === value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => onChange(opt.value)}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            accessibilityLabel={opt.label}
            style={[
              styles.option,
              {
                backgroundColor: selected ? colors.primary : 'transparent',
                borderRadius: radii.sm,
                paddingVertical: spacing.sm,
                paddingHorizontal: spacing.md,
              },
            ]}
          >
            <Text variant="label" color={selected ? colors.textInverse : colors.textSecondary}>{opt.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row' },
  option: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
