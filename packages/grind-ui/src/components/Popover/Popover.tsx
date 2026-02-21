import React, { useEffect, useRef, useState } from 'react';
import {
  LayoutRectangle,
  Modal,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import type { PopoverPosition, PopoverProps } from './Popover.types';

const ARROW_SIZE = 8;

export const Popover: React.FC<PopoverProps> = ({
  visible,
  onClose,
  content,
  position = 'bottom',
  children,
  style,
  testID,
}) => {
  const { colors, spacing, radii, shadows } = useTheme();
  const [anchorLayout, setAnchorLayout] = useState<LayoutRectangle & { pageX: number; pageY: number } | null>(null);
  const anchorRef = useRef<View>(null);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);

  useEffect(() => {
    if (visible) {
      anchorRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
        setAnchorLayout({ x: pageX, y: pageY, width, height, pageX, pageY });
      });
      opacity.value = withTiming(1, { duration: 200 });
      scale.value = withTiming(1, { duration: 200 });
    } else {
      opacity.value = withTiming(0, { duration: 150 });
      scale.value = withTiming(0.9, { duration: 150 });
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const getPopoverPosition = () => {
    if (!anchorLayout) return {};
    const { pageX, pageY, width, height } = anchorLayout;
    switch (position) {
      case 'top':
        return { bottom: undefined, top: pageY - ARROW_SIZE, left: pageX + width / 2 };
      case 'bottom':
        return { top: pageY + height + ARROW_SIZE, left: pageX + width / 2 };
      case 'left':
        return { top: pageY + height / 2, right: undefined, left: pageX - ARROW_SIZE };
      case 'right':
        return { top: pageY + height / 2, left: pageX + width + ARROW_SIZE };
    }
  };

  const getArrowStyle = (): any => {
    const bg = colors.surface ?? '#272727';
    const base = { position: 'absolute' as const, width: 0, height: 0, borderStyle: 'solid' as const };
    switch (position) {
      case 'bottom':
        return {
          ...base, top: -ARROW_SIZE, alignSelf: 'center' as const,
          borderLeftWidth: ARROW_SIZE, borderRightWidth: ARROW_SIZE, borderBottomWidth: ARROW_SIZE,
          borderLeftColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: bg,
        };
      case 'top':
        return {
          ...base, bottom: -ARROW_SIZE, alignSelf: 'center' as const,
          borderLeftWidth: ARROW_SIZE, borderRightWidth: ARROW_SIZE, borderTopWidth: ARROW_SIZE,
          borderLeftColor: 'transparent', borderRightColor: 'transparent', borderTopColor: bg,
        };
      case 'left':
        return {
          ...base, right: -ARROW_SIZE, top: '50%' as any, marginTop: -ARROW_SIZE,
          borderTopWidth: ARROW_SIZE, borderBottomWidth: ARROW_SIZE, borderLeftWidth: ARROW_SIZE,
          borderTopColor: 'transparent', borderBottomColor: 'transparent', borderLeftColor: bg,
        };
      case 'right':
        return {
          ...base, left: -ARROW_SIZE, top: '50%' as any, marginTop: -ARROW_SIZE,
          borderTopWidth: ARROW_SIZE, borderBottomWidth: ARROW_SIZE, borderRightWidth: ARROW_SIZE,
          borderTopColor: 'transparent', borderBottomColor: 'transparent', borderRightColor: bg,
        };
    }
  };

  const popoverPos = getPopoverPosition();

  return (
    <View>
      <View ref={anchorRef} collapsable={false}>
        {children}
      </View>
      {visible && (
        <Modal transparent animationType="none" onRequestClose={onClose} statusBarTranslucent>
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
          {anchorLayout && (
            <Animated.View
              testID={testID}
              accessibilityRole="none"
              style={[
                styles.popover,
                {
                  ...popoverPos,
                  backgroundColor: colors.surface ?? '#272727',
                  borderRadius: radii.lg,
                  padding: spacing.md,
                  ...shadows.md,
                },
                position === 'top' || position === 'bottom'
                  ? { transform: [{ translateX: -80 }] }
                  : { transform: [{ translateY: -40 }] },
                animatedStyle,
                style,
              ]}
            >
              <View style={getArrowStyle()} />
              {content}
            </Animated.View>
          )}
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  popover: {
    position: 'absolute',
    minWidth: 120,
    maxWidth: 280,
    zIndex: 9999,
  },
});
