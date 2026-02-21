import React, { useCallback } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import type { ToggleGroupProps } from './ToggleGroup.types';

export const ToggleGroup: React.FC<ToggleGroupProps> = ({
  type = 'single',
  value,
  onValueChange,
  items,
  size = 'md',
  orientation = 'horizontal',
  style,
  testID,
}) => {
  const { colors, spacing, radii, sizes } = useTheme();

  const height = sizes.buttonHeight?.[size] ?? (size === 'sm' ? 32 : size === 'md' ? 40 : 48);
  const fontSize = size === 'sm' ? 12 : size === 'md' ? 14 : 16;
  const px = size === 'sm' ? (spacing.sm ?? 8) : size === 'md' ? (spacing.md ?? 16) : (spacing.lg ?? 24);

  const selectedValues = Array.isArray(value) ? value : value ? [value] : [];

  const handlePress = useCallback(
    (itemValue: string) => {
      if (type === 'single') {
        onValueChange(itemValue);
      } else {
        const next = selectedValues.includes(itemValue)
          ? selectedValues.filter((v) => v !== itemValue)
          : [...selectedValues, itemValue];
        onValueChange(next);
      }
    },
    [type, selectedValues, onValueChange],
  );

  const borderRadius = radii.md ?? 12;

  return (
    <View
      testID={testID}
      style={[
        {
          flexDirection: orientation === 'horizontal' ? 'row' : 'column',
          borderRadius,
          borderWidth: 1,
          borderColor: colors.border ?? '#333',
          overflow: 'hidden',
        },
        style,
      ]}
      accessibilityRole="radiogroup"
    >
      {items.map((item, i) => {
        const isSelected = selectedValues.includes(item.value);
        const isFirst = i === 0;
        const isLast = i === items.length - 1;

        return (
          <Pressable
            key={item.value}
            onPress={() => !item.disabled && handlePress(item.value)}
            disabled={item.disabled}
            accessibilityRole={type === 'single' ? 'radio' : 'checkbox'}
            accessibilityLabel={item.label}
            accessibilityState={{ selected: isSelected, disabled: item.disabled ?? false }}
            style={[
              {
                height,
                paddingHorizontal: px,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                backgroundColor: isSelected ? (colors.primary ?? '#C8FF00') : 'transparent',
                opacity: item.disabled ? 0.4 : 1,
                borderRightWidth: !isLast && orientation === 'horizontal' ? 1 : 0,
                borderBottomWidth: !isLast && orientation === 'vertical' ? 1 : 0,
                borderColor: colors.border ?? '#333',
              },
            ]}
          >
            {item.icon && <View style={{ marginRight: spacing.xs ?? 4 }}>{item.icon}</View>}
            <Animated.Text
              style={{
                fontSize,
                fontWeight: isSelected ? '700' : '500',
                color: isSelected ? (colors.textInverse ?? '#000') : (colors.text ?? '#fff'),
              }}
            >
              {item.label}
            </Animated.Text>
          </Pressable>
        );
      })}
    </View>
  );
};
