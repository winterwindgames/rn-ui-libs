import React, { useState, useRef } from 'react';
import { View, Text, Pressable, StyleSheet, LayoutRectangle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { TooltipProps } from './Tooltip.types';

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  placement = 'top',
  children,
  style,
  testID,
}) => {
  const { colors, radii } = useTheme();
  const [visible, setVisible] = useState(false);
  const opacity = useSharedValue(0);

  const toggle = () => {
    if (visible) {
      opacity.value = withTiming(0, { duration: 150 });
      setTimeout(() => setVisible(false), 150);
    } else {
      setVisible(true);
      opacity.value = withTiming(1, { duration: 200 });
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const tooltipPosition: Record<string, any> = {
    top: { bottom: '100%', marginBottom: 8, alignSelf: 'center' as const },
    bottom: { top: '100%', marginTop: 8, alignSelf: 'center' as const },
    left: { right: '100%', marginRight: 8, alignSelf: 'center' as const },
    right: { left: '100%', marginLeft: 8, alignSelf: 'center' as const },
  };

  const arrowPosition: Record<string, any> = {
    top: { bottom: -4, alignSelf: 'center', transform: [{ rotate: '45deg' }] },
    bottom: { top: -4, alignSelf: 'center', transform: [{ rotate: '45deg' }] },
    left: { right: -4, top: '50%', marginTop: -4, transform: [{ rotate: '45deg' }] },
    right: { left: -4, top: '50%', marginTop: -4, transform: [{ rotate: '45deg' }] },
  };

  return (
    <View style={[styles.wrapper, style]} testID={testID}>
      <Pressable onPress={toggle} accessibilityRole="button" accessibilityHint="Show tooltip">
        {children}
      </Pressable>
      {visible && (
        <Animated.View
          style={[
            styles.tooltip,
            {
              backgroundColor: colors.surfaceSecondary || '#2A2A2A',
              borderRadius: radii?.sm || 8,
            },
            tooltipPosition[placement],
            animatedStyle,
          ]}
          accessibilityRole="tooltip"
          accessibilityLabel={content}
        >
          <Text style={[styles.text, { color: colors.text || '#FFFFFF' }]}>{content}</Text>
          <View
            style={[
              styles.arrow,
              { backgroundColor: colors.surfaceSecondary || '#2A2A2A' },
              arrowPosition[placement],
            ]}
          />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  tooltip: {
    position: 'absolute',
    paddingHorizontal: 12,
    paddingVertical: 8,
    zIndex: 999,
    minWidth: 80,
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  arrow: {
    position: 'absolute',
    width: 8,
    height: 8,
  },
});
