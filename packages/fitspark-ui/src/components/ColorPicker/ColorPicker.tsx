import React, { useCallback } from 'react';
import { View, TouchableOpacity, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../Text';
import type { ColorPickerProps } from './ColorPicker.types';

const DEFAULT_COLORS = [
  '#C8FF00', '#FF453A', '#FF9F0A', '#FFD60A', '#30D158',
  '#64D2FF', '#0A84FF', '#BF5AF2', '#FF375F', '#FFFFFF',
  '#8E8E93', '#636366', '#48484A', '#2C2C2E', '#1C1C1E',
];

export const ColorPicker: React.FC<ColorPickerProps> = ({
  colors: palette = DEFAULT_COLORS,
  value,
  onValueChange,
  columns = 5,
  swatchSize = 44,
  label,
  disabled = false,
  style,
  testID,
}) => {
  const { theme } = useTheme();
  const { colors: themeColors, spacing, radii } = theme;

  const handleSelect = useCallback(
    (color: string) => {
      if (!disabled) onValueChange?.(color);
    },
    [disabled, onValueChange],
  );

  const gridStyle: ViewStyle = {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    opacity: disabled ? 0.4 : 1,
  };

  const swatchStyle = (color: string): ViewStyle => ({
    width: swatchSize,
    height: swatchSize,
    borderRadius: swatchSize / 2,
    backgroundColor: color,
    borderWidth: color === value ? 3 : 1,
    borderColor: color === value ? themeColors.text : themeColors.border,
    alignItems: 'center',
    justifyContent: 'center',
  });

  return (
    <View style={[{ gap: spacing.sm }, style]} testID={testID}>
      {label && <Text variant="label" color="textSecondary">{label}</Text>}
      <View style={gridStyle} accessibilityRole="radiogroup" accessibilityLabel={label ?? 'Color picker'}>
        {palette.map((color) => (
          <TouchableOpacity
            key={color}
            onPress={() => handleSelect(color)}
            style={swatchStyle(color)}
            activeOpacity={0.7}
            accessibilityRole="radio"
            accessibilityState={{ selected: color === value }}
            accessibilityLabel={`Color ${color}`}
          >
            {color === value && (
              <Text style={{ fontSize: 16, color: isLight(color) ? '#000' : '#FFF', fontWeight: '700' }}>✓</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

function isLight(hex: string): boolean {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}
