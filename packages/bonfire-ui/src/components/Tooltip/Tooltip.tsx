import React, { useState, useRef, useCallback } from 'react';
import { Modal, Pressable, View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../Text/Text';
import type { TooltipProps } from './Tooltip.types';

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  placement = 'top',
  style,
  testID,
}) => {
  const { colors, spacing, radii } = useTheme();
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const triggerRef = useRef<View>(null);
  const opacity = useSharedValue(0);

  const show = useCallback(() => {
    triggerRef.current?.measureInWindow((x, y, w, h) => {
      setPos({ x, y, w, h });
      setVisible(true);
      opacity.value = withTiming(1, { duration: 150 });
    });
  }, [opacity]);

  const hide = useCallback(() => {
    opacity.value = withTiming(0, { duration: 100 });
    setTimeout(() => setVisible(false), 100);
  }, [opacity]);

  const animStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));
  const top = placement === 'top' ? pos.y - 36 : pos.y + pos.h + 4;

  return (
    <>
      <Pressable ref={triggerRef} onPress={show} testID={testID}>{children}</Pressable>
      <Modal visible={visible} transparent animationType="none" onRequestClose={hide}>
        <Pressable style={StyleSheet.absoluteFill} onPress={hide} />
        <Animated.View
          style={[
            styles.tooltip,
            { top, left: pos.x, backgroundColor: colors.surfaceElevated, borderRadius: radii.sm, paddingVertical: spacing.xs, paddingHorizontal: spacing.sm },
            animStyle,
            style,
          ]}
        >
          <Text variant="caption" color={colors.text}>{content}</Text>
        </Animated.View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  tooltip: { position: 'absolute' },
});
