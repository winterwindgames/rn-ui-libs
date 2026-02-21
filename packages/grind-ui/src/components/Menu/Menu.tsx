import React, { useCallback, useEffect } from 'react';
import {
  Pressable,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { Portal } from '../Portal';
import type { MenuProps } from './Menu.types';

export const Menu: React.FC<MenuProps> = ({
  trigger,
  items,
  visible,
  onClose,
  placement = 'bottom-left',
  style,
  testID,
}) => {
  const { colors, spacing, radii, typography, shadows } = useTheme();
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.85);

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 200 });
      scale.value = withTiming(1, { duration: 200 });
    } else {
      opacity.value = withTiming(0, { duration: 150 });
      scale.value = withTiming(0.85, { duration: 150 });
    }
  }, [visible, opacity, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const getPositionStyle = () => {
    switch (placement) {
      case 'bottom-right':
        return { right: 0, top: '100%' as const };
      case 'top-left':
        return { left: 0, bottom: '100%' as const };
      case 'top-right':
        return { right: 0, bottom: '100%' as const };
      case 'bottom-left':
      default:
        return { left: 0, top: '100%' as const };
    }
  };

  const handleItemPress = useCallback(
    (onPress: () => void, disabled?: boolean) => {
      if (disabled) return;
      onPress();
      onClose();
    },
    [onClose],
  );

  return (
    <View testID={testID} style={[styles.container, style]}>
      {trigger}
      {visible && (
        <Portal>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Close menu"
          />
          <View style={[styles.anchor]}>
            <Animated.View
              style={[
                styles.menu,
                {
                  backgroundColor: colors.surfaceElevated ?? '#fff',
                  borderRadius: radii.md ?? 12,
                  borderColor: colors.border ?? '#e2e2e2',
                  borderWidth: 1,
                  ...shadows.md,
                  ...getPositionStyle(),
                },
                animatedStyle,
              ]}
            >
              {items.map((item, index) => (
                <Pressable
                  key={`${item.label}-${index}`}
                  onPress={() => handleItemPress(item.onPress, item.disabled)}
                  accessibilityRole="menuitem"
                  accessibilityLabel={item.label}
                  accessibilityState={{ disabled: item.disabled ?? false }}
                  style={({ pressed }) => [
                    styles.menuItem,
                    {
                      paddingHorizontal: spacing.md ?? 16,
                      paddingVertical: spacing.sm + 4,
                      opacity: item.disabled ? 0.4 : pressed ? 0.7 : 1,
                      backgroundColor: pressed && !item.disabled
                        ? (colors.surface ?? '#f0f0f0')
                        : 'transparent',
                    },
                    index < items.length - 1 && {
                      borderBottomWidth: StyleSheet.hairlineWidth,
                      borderBottomColor: colors.border ?? '#e2e2e2',
                    },
                  ]}
                >
                  {item.icon && (
                    <View style={{ marginRight: spacing.sm ?? 8 }}>
                      {item.icon}
                    </View>
                  )}
                  <Text
                    style={[
                      {
                        ...typography.body,
                        color: item.destructive
                          ? (colors.error ?? '#E5534B')
                          : (colors.text ?? '#242222'),
                      },
                    ]}
                    numberOfLines={1}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              ))}
            </Animated.View>
          </View>
        </Portal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  anchor: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    position: 'absolute',
    minWidth: 180,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
