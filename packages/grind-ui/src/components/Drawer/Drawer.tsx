import React, { useEffect } from 'react';
import {
  Pressable,
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
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
  const { colors, spacing, shadows } = useTheme();

  const resolvedWidth = typeof width === 'string'
    ? (parseFloat(width) / 100) * SCREEN_WIDTH
    : width;

  const translateX = useSharedValue(side === 'left' ? -resolvedWidth : resolvedWidth);
  const backdropOpacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      translateX.value = withTiming(0, { duration: 300 });
      backdropOpacity.value = withTiming(1, { duration: 300 });
    } else {
      translateX.value = withTiming(
        side === 'left' ? -resolvedWidth : resolvedWidth,
        { duration: 250 },
      );
      backdropOpacity.value = withTiming(0, { duration: 250 });
    }
  }, [visible, side, resolvedWidth, translateX, backdropOpacity]);

  const drawerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  if (!visible && translateX.value !== 0) {
    // Allow animation to complete, but render nothing when fully hidden
  }

  return (
    <View
      testID={testID}
      style={[StyleSheet.absoluteFill, styles.root, { pointerEvents: visible ? 'auto' : 'none' }]}
    >
      {overlay && (
        <Animated.View style={[StyleSheet.absoluteFill, backdropAnimatedStyle]}>
          <Pressable
            style={[StyleSheet.absoluteFill, { backgroundColor: colors.overlay ?? 'rgba(0,0,0,0.5)' }]}
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel="Close drawer"
          />
        </Animated.View>
      )}
      <Animated.View
        accessibilityRole="menu"
        accessibilityLabel="Navigation drawer"
        style={[
          styles.drawer,
          {
            width: resolvedWidth,
            backgroundColor: colors.surface ?? '#fff',
            ...shadows.lg,
            [side === 'left' ? 'left' : 'right']: 0,
          },
          drawerAnimatedStyle,
          style,
        ]}
      >
        {header && (
          <View style={[styles.section, { paddingHorizontal: spacing.md ?? 16, paddingTop: spacing.lg ?? 24, paddingBottom: spacing.sm ?? 8, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border ?? '#e2e2e2' }]}>
            {header}
          </View>
        )}
        <View style={[styles.content, { padding: spacing.md ?? 16 }]}>
          {children}
        </View>
        {footer && (
          <View style={[styles.section, { paddingHorizontal: spacing.md ?? 16, paddingBottom: spacing.lg ?? 24, paddingTop: spacing.sm ?? 8, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border ?? '#e2e2e2' }]}>
            {footer}
          </View>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    zIndex: 1000,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
  section: {},
  content: {
    flex: 1,
  },
});
