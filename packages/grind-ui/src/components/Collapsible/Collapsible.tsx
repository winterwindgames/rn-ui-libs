import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutChangeEvent } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import type { CollapsibleProps } from './Collapsible.types';

export const Collapsible: React.FC<CollapsibleProps> = ({
  expanded,
  title,
  onToggle,
  children,
  style,
  testID,
}) => {
  const { colors, spacing, typography, radii } = useTheme();
  const [contentHeight, setContentHeight] = useState(0);
  const animatedHeight = useSharedValue(expanded ? 1 : 0);
  const rotation = useSharedValue(expanded ? 1 : 0);

  React.useEffect(() => {
    const config = { duration: 250, easing: Easing.bezier(0.4, 0, 0.2, 1) };
    animatedHeight.value = withTiming(expanded ? 1 : 0, config);
    rotation.value = withTiming(expanded ? 1 : 0, config);
  }, [expanded]);

  const bodyStyle = useAnimatedStyle(() => ({
    height: contentHeight > 0 ? animatedHeight.value * contentHeight : undefined,
    opacity: animatedHeight.value,
    overflow: 'hidden' as const,
  }));

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value * 180}deg` }],
  }));

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const h = e.nativeEvent.layout.height;
    if (h > 0 && contentHeight === 0) {
      setContentHeight(h);
    }
  }, [contentHeight]);

  return (
    <View testID={testID} style={[styles.container, style]}>
      {title && (
        <TouchableOpacity
          onPress={onToggle}
          accessibilityRole="button"
          accessibilityState={{ expanded }}
          accessibilityLabel={`${title}, ${expanded ? 'expanded' : 'collapsed'}`}
          style={[
            styles.header,
            {
              paddingVertical: spacing.md,
              paddingHorizontal: spacing.md,
            },
          ]}
        >
          <Text
            style={[
              styles.title,
              {
                color: colors.text,
                fontSize: typography.body.fontSize,
                fontWeight: typography.h1.fontWeight as any,
                textTransform: 'uppercase',
                letterSpacing: 1.2,
              },
            ]}
          >
            {title}
          </Text>
          <Animated.Text
            style={[
              styles.chevron,
              { color: colors.textSecondary, fontSize: 18 },
              chevronStyle,
            ]}
          >
            ▼
          </Animated.Text>
        </TouchableOpacity>
      )}

      <Animated.View style={contentHeight > 0 ? bodyStyle : undefined}>
        <View
          onLayout={contentHeight === 0 ? onLayout : undefined}
          style={{ paddingHorizontal: spacing.md, paddingBottom: spacing.md }}
        >
          {children}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {},
  chevron: {},
});
