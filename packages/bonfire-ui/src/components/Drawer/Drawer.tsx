import React, { useEffect } from 'react';
import { View, Pressable, StyleSheet, Dimensions, Modal } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import type { DrawerProps } from './Drawer.types';

const { width: SCREEN_W } = Dimensions.get('window');

export const Drawer: React.FC<DrawerProps> = ({
  visible = false, onClose, side = 'left', width: drawerWidth, header, footer, overlay = true, children, style, testID,
}) => {
  const { colors, shadows } = useTheme();
  const w = typeof drawerWidth === 'number' ? drawerWidth : SCREEN_W * 0.8;
  const translateX = useSharedValue(side === 'left' ? -w : w);

  useEffect(() => {
    translateX.value = withTiming(visible ? 0 : (side === 'left' ? -w : w), { duration: 300 });
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ translateX: translateX.value }] }));

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      {overlay && <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: colors.overlay }]} onPress={onClose} />}
      <Animated.View testID={testID} style={[styles.drawer, { width: w, backgroundColor: colors.surface, ...shadows.lg }, side === 'right' && styles.right, animatedStyle, style]}>
        {header}
        <View style={{ flex: 1 }}>{children}</View>
        {footer}
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  drawer: { position: 'absolute', top: 0, bottom: 0, left: 0 },
  right: { left: undefined, right: 0 },
});
