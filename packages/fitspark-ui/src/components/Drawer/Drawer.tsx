import React from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import type { DrawerProps } from './Drawer.types';

const SCREEN_WIDTH = Dimensions.get('window').width;

export const Drawer: React.FC<DrawerProps> = ({
  visible,
  onClose,
  side = 'left',
  width = '80%',
  header,
  footer,
  children,
  overlay = true,
  style,
  testID,
}) => {
  const { colors, spacing } = useTheme();

  const resolvedWidth =
    typeof width === 'string' && width.endsWith('%')
      ? (parseFloat(width) / 100) * SCREEN_WIDTH
      : typeof width === 'number'
      ? width
      : SCREEN_WIDTH * 0.8;

  const translateX = useSharedValue(visible ? 0 : side === 'left' ? -resolvedWidth : resolvedWidth);
  const backdropOpacity = useSharedValue(visible ? 1 : 0);

  React.useEffect(() => {
    translateX.value = withTiming(visible ? 0 : side === 'left' ? -resolvedWidth : resolvedWidth, {
      duration: 300,
    });
    backdropOpacity.value = withTiming(visible ? 1 : 0, { duration: 300 });
  }, [visible, side, resolvedWidth]);

  const drawerAnimStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const backdropAnimStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  if (!visible && translateX.value !== 0) {
    // Allow animation to complete
  }

  return (
    <View
      style={[StyleSheet.absoluteFill, { zIndex: visible ? 1000 : -1 }]}
      pointerEvents={visible ? 'auto' : 'none'}
      testID={testID}
    >
      {overlay && (
        <Animated.View style={[StyleSheet.absoluteFill, backdropAnimStyle]}>
          <Pressable
            style={[StyleSheet.absoluteFill, { backgroundColor: colors.overlay ?? 'rgba(0,0,0,0.5)' }]}
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Close drawer"
          />
        </Animated.View>
      )}
      <Animated.View
        style={[
          styles.drawer,
          {
            width: resolvedWidth,
            backgroundColor: colors.surface ?? '#1C1C1E',
            [side]: 0,
            paddingTop: spacing.xl ?? 32,
          },
          drawerAnimStyle,
          style,
        ]}
        accessibilityRole="menu"
      >
        {header && <View style={{ paddingHorizontal: spacing.md ?? 16, paddingBottom: spacing.md ?? 16 }}>{header}</View>}
        <View style={{ flex: 1, paddingHorizontal: spacing.md ?? 16 }}>{children}</View>
        {footer && <View style={{ paddingHorizontal: spacing.md ?? 16, paddingTop: spacing.md ?? 16 }}>{footer}</View>}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 1001,
  },
});
