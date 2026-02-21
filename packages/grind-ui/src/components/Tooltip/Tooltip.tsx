import React, { useCallback, useRef, useState } from 'react';
import {
  LayoutRectangle,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import type { TooltipPosition, TooltipProps } from './Tooltip.types';

const ARROW_SIZE = 6;
const TOOLTIP_BG = '#242222';

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = 'top',
  children,
  style,
  testID,
}) => {
  const { spacing, radii, typography } = useTheme();
  const [visible, setVisible] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState<LayoutRectangle | null>(null);
  const opacity = useSharedValue(0);
  const triggerRef = useRef<View>(null);

  const show = useCallback(() => {
    triggerRef.current?.measure((_x, _y, width, height, pageX, pageY) => {
      setTriggerLayout({ x: pageX, y: pageY, width, height });
      setVisible(true);
      opacity.value = withTiming(1, { duration: 150 });
    });
  }, []);

  const hide = useCallback(() => {
    opacity.value = withTiming(0, { duration: 150 });
    setTimeout(() => setVisible(false), 150);
  }, []);

  const toggle = useCallback(() => {
    if (visible) hide();
    else show();
  }, [visible, show, hide]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const getTooltipPosition = (): { top?: number; left?: number; right?: number; bottom?: number } => {
    if (!triggerLayout) return {};
    const { x, y, width, height } = triggerLayout;
    switch (position) {
      case 'top':
        return { top: y - 8, left: x + width / 2 };
      case 'bottom':
        return { top: y + height + 8, left: x + width / 2 };
      case 'left':
        return { top: y + height / 2, left: x - 8 };
      case 'right':
        return { top: y + height / 2, left: x + width + 8 };
    }
  };

  const getTransformOrigin = (): { translateX?: number; translateY?: number } => {
    switch (position) {
      case 'top':
        return { translateY: 0, translateX: -50 };
      case 'bottom':
        return { translateY: 0, translateX: -50 };
      case 'left':
        return { translateX: 0, translateY: -50 };
      case 'right':
        return { translateX: 0, translateY: -50 };
    }
  };

  const getArrowStyle = (): any => {
    const base = {
      position: 'absolute' as const,
      width: 0,
      height: 0,
      borderStyle: 'solid' as const,
    };
    switch (position) {
      case 'top':
        return {
          ...base,
          bottom: -ARROW_SIZE,
          alignSelf: 'center' as const,
          borderLeftWidth: ARROW_SIZE,
          borderRightWidth: ARROW_SIZE,
          borderTopWidth: ARROW_SIZE,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderTopColor: TOOLTIP_BG,
        };
      case 'bottom':
        return {
          ...base,
          top: -ARROW_SIZE,
          alignSelf: 'center' as const,
          borderLeftWidth: ARROW_SIZE,
          borderRightWidth: ARROW_SIZE,
          borderBottomWidth: ARROW_SIZE,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: TOOLTIP_BG,
        };
      case 'left':
        return {
          ...base,
          right: -ARROW_SIZE,
          top: '50%' as any,
          marginTop: -ARROW_SIZE,
          borderTopWidth: ARROW_SIZE,
          borderBottomWidth: ARROW_SIZE,
          borderLeftWidth: ARROW_SIZE,
          borderTopColor: 'transparent',
          borderBottomColor: 'transparent',
          borderLeftColor: TOOLTIP_BG,
        };
      case 'right':
        return {
          ...base,
          left: -ARROW_SIZE,
          top: '50%' as any,
          marginTop: -ARROW_SIZE,
          borderTopWidth: ARROW_SIZE,
          borderBottomWidth: ARROW_SIZE,
          borderRightWidth: ARROW_SIZE,
          borderTopColor: 'transparent',
          borderBottomColor: 'transparent',
          borderRightColor: TOOLTIP_BG,
        };
    }
  };

  const tooltipPos = getTooltipPosition();

  return (
    <View>
      <Pressable ref={triggerRef} onPress={toggle} collapsable={false}>
        {children}
      </Pressable>
      {visible && triggerLayout && (
        <Animated.View
          testID={testID}
          accessibilityRole="text"
          accessibilityLabel={content}
          style={[
            styles.tooltip,
            {
              position: 'absolute',
              ...tooltipPos,
              backgroundColor: TOOLTIP_BG,
              borderRadius: radii.md,
              paddingHorizontal: spacing.sm,
              paddingVertical: spacing.xs,
            },
            position === 'top' || position === 'bottom'
              ? { transform: [{ translateX: -50 }] }
              : { transform: [{ translateY: -50 }] },
            animatedStyle,
            style,
          ]}
        >
          <View style={getArrowStyle()} />
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 12,
              fontFamily: typography.body.fontFamily,
            }}
          >
            {content}
          </Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tooltip: {
    zIndex: 9999,
    maxWidth: 200,
  },
});
