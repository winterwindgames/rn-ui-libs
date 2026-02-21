import React, { useCallback } from 'react';
import { Pressable, StyleSheet, View, type ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { Portal } from '../Portal';
import type { MenuProps, MenuItem } from './Menu.types';

export const Menu: React.FC<MenuProps> = ({
  trigger,
  items,
  visible,
  onClose,
  placement = 'bottom-left',
  style,
  testID,
}) => {
  const { colors, spacing, radii, shadows } = useTheme();
  const scale = useSharedValue(visible ? 1 : 0);
  const opacity = useSharedValue(visible ? 1 : 0);

  React.useEffect(() => {
    scale.value = withTiming(visible ? 1 : 0, { duration: 200 });
    opacity.value = withTiming(visible ? 1 : 0, { duration: 200 });
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: 0.85 + scale.value * 0.15 }],
  }));

  const menuStyle: ViewStyle = {
    backgroundColor: colors.surfaceElevated ?? colors.surface,
    borderRadius: radii.md ?? 12,
    paddingVertical: spacing.xs ?? 4,
    minWidth: 180,
    ...(shadows?.md ?? {}),
    borderWidth: 1,
    borderColor: colors.cardBorder ?? colors.border,
  };

  const renderItem = useCallback(
    (item: MenuItem, index: number) => {
      const itemColor = item.destructive
        ? colors.error
        : item.disabled
        ? colors.disabledText ?? colors.textMuted
        : colors.text;

      return (
        <Pressable
          key={index}
          onPress={() => {
            if (!item.disabled) {
              item.onPress?.();
              onClose();
            }
          }}
          disabled={item.disabled}
          accessibilityRole="menuitem"
          accessibilityLabel={item.label}
          accessibilityState={{ disabled: item.disabled ?? false }}
          style={({ pressed }) => [
            styles.item,
            {
              paddingHorizontal: spacing.md ?? 16,
              paddingVertical: spacing.sm ?? 8,
              backgroundColor: pressed ? (colors.overlay ?? 'rgba(255,255,255,0.05)') : 'transparent',
              opacity: item.disabled ? 0.5 : 1,
            },
          ]}
        >
          {item.icon && <View style={{ marginRight: spacing.sm ?? 8 }}>{item.icon}</View>}
          <Animated.Text style={{ color: itemColor, fontSize: 15, fontWeight: '500' }}>
            {item.label}
          </Animated.Text>
        </Pressable>
      );
    },
    [colors, spacing, onClose],
  );

  return (
    <View testID={testID} style={style}>
      {trigger}
      {visible && (
        <Portal>
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
          <Animated.View
            style={[
              menuStyle,
              styles.menuContainer,
              animatedStyle,
              placement.includes('right') && { right: spacing.md ?? 16 },
              placement.includes('left') && { left: spacing.md ?? 16 },
              placement.includes('top') && { top: spacing.xl ?? 32 },
              placement.includes('bottom') && { top: 100 },
            ]}
            accessibilityRole="menu"
          >
            {items.map(renderItem)}
          </Animated.View>
        </Portal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    position: 'absolute',
    zIndex: 999,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
