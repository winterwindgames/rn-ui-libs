import React, { useCallback } from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import type { ToggleGroupProps, ToggleGroupSize } from './ToggleGroup.types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SIZE_MAP: Record<ToggleGroupSize, { height: number; px: number; fontSize: number }> = {
  sm: { height: 32, px: 12, fontSize: 13 },
  md: { height: 40, px: 16, fontSize: 15 },
  lg: { height: 48, px: 20, fontSize: 17 },
};

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
  const { colors, radii, spacing, typography } = useTheme();
  const sizeConfig = SIZE_MAP[size];

  const isSelected = useCallback(
    (itemValue: string) => {
      if (Array.isArray(value)) return value.includes(itemValue);
      return value === itemValue;
    },
    [value],
  );

  const handlePress = useCallback(
    (itemValue: string) => {
      if (type === 'single') {
        onValueChange(itemValue);
      } else {
        const arr = Array.isArray(value) ? value : [value];
        if (arr.includes(itemValue)) {
          onValueChange(arr.filter((v) => v !== itemValue));
        } else {
          onValueChange([...arr, itemValue]);
        }
      }
    },
    [type, value, onValueChange],
  );

  const isHorizontal = orientation === 'horizontal';

  return (
    <View
      testID={testID}
      style={[
        styles.container,
        {
          flexDirection: isHorizontal ? 'row' : 'column',
          borderRadius: radii.md ?? 12,
          borderWidth: 1,
          borderColor: colors.border ?? '#e2e2e2',
          overflow: 'hidden',
        },
        style,
      ]}
      accessibilityRole="radiogroup"
    >
      {items.map((item, index) => {
        const selected = isSelected(item.value);
        const isFirst = index === 0;
        const isLast = index === items.length - 1;

        return (
          <Pressable
            key={item.value}
            onPress={() => !item.disabled && handlePress(item.value)}
            accessibilityRole={type === 'single' ? 'radio' : 'checkbox'}
            accessibilityLabel={item.label}
            accessibilityState={{ selected, disabled: item.disabled ?? false }}
            style={[
              styles.item,
              {
                height: sizeConfig.height,
                paddingHorizontal: sizeConfig.px,
                backgroundColor: selected
                  ? (colors.primary ?? '#787AF3')
                  : 'transparent',
                opacity: item.disabled ? 0.4 : 1,
              },
              !isLast && {
                [isHorizontal ? 'borderRightWidth' : 'borderBottomWidth']: StyleSheet.hairlineWidth,
                [isHorizontal ? 'borderRightColor' : 'borderBottomColor']: colors.border ?? '#e2e2e2',
              },
            ]}
          >
            {item.icon && (
              <View style={{ marginRight: spacing.xs ?? 4 }}>{item.icon}</View>
            )}
            <Text
              style={{
                fontSize: sizeConfig.fontSize,
                fontWeight: '600',
                color: selected
                  ? (colors.textInverse ?? '#fff')
                  : (colors.text ?? '#242222'),
                fontFamily: typography.body.fontFamily ?? undefined,
              }}
              numberOfLines={1}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
