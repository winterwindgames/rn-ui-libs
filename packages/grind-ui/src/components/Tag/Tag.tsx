import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { TagProps } from './Tag.types';

export const Tag: React.FC<TagProps> = ({
  label,
  variant: rawVariant = 'solid',
  color,
  leftIcon,
  onRemove,
  size = 'md',
  style,
  testID,
}) => {
  const { colors, spacing, radii } = useTheme();

  // Support 'soft' as alias for 'subtle'
  const variant = rawVariant === 'soft' ? 'subtle' : rawVariant;

  // Resolve named theme colors (e.g. "primary", "secondary", "success", "accent")
  const resolveColor = (c?: string): string => {
    if (!c) return colors.primary;
    if (c in colors) return (colors as any)[c];
    return c;
  };
  const tagColor = resolveColor(color);
  const isSm = size === 'sm';
  const height = isSm ? 24 : 32;
  const fontSize = isSm ? 11 : 13;
  const px = isSm ? spacing.xs : spacing.sm;

  const variantStyles: Record<string, any> = {
    solid: {
      backgroundColor: tagColor,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1.5,
      borderColor: tagColor,
    },
    subtle: {
      backgroundColor: tagColor + '1A', // 10% opacity
    },
  };

  const textColor =
    variant === 'solid' ? '#FFFFFF' : tagColor;

  return (
    <View
      style={[
        styles.container,
        {
          height,
          borderRadius: height / 2,
          paddingHorizontal: px,
        },
        variantStyles[variant],
        style,
      ]}
      testID={testID}
      accessibilityRole="text"
      accessibilityLabel={label}
    >
      {leftIcon && <View style={{ marginRight: spacing.xs }}>{leftIcon}</View>}
      <Text style={[styles.label, { fontSize, color: textColor }]}>{label}</Text>
      {onRemove && (
        <Pressable
          onPress={onRemove}
          hitSlop={8}
          style={{ marginLeft: spacing.xs }}
          accessibilityRole="button"
          accessibilityLabel={`Remove ${label}`}
        >
          <Text style={[styles.remove, { color: textColor, fontSize: fontSize + 2 }]}>
            ✕
          </Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  label: {
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  remove: {
    fontWeight: '700',
  },
});
