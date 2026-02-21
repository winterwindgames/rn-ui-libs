import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutChangeEvent } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { CollapsibleProps } from './Collapsible.types';

export const Collapsible: React.FC<CollapsibleProps> = ({
  title,
  children,
  initiallyExpanded = false,
  onToggle,
  style,
  headerStyle,
  testID = 'collapsible',
}) => {
  const { colors, spacing, radii, typography } = useTheme();
  const [expanded, setExpanded] = useState(initiallyExpanded);
  const contentHeight = useSharedValue(0);
  const progress = useSharedValue(initiallyExpanded ? 1 : 0);
  const [measuredHeight, setMeasuredHeight] = useState(0);

  const toggle = useCallback(() => {
    const next = !expanded;
    setExpanded(next);
    progress.value = withTiming(next ? 1 : 0, { duration: 300 });
    onToggle?.(next);
  }, [expanded, onToggle, progress]);

  const bodyStyle = useAnimatedStyle(() => ({
    height: interpolate(progress.value, [0, 1], [0, measuredHeight]),
    opacity: progress.value,
    overflow: 'hidden',
  }));

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${interpolate(progress.value, [0, 1], [0, 180])}deg` },
    ],
  }));

  const handleLayout = (e: LayoutChangeEvent) => {
    const h = e.nativeEvent.layout.height;
    if (h > 0 && h !== measuredHeight) {
      setMeasuredHeight(h);
      if (expanded) {
        progress.value = 1;
      }
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderRadius: radii.md,
          borderWidth: 1,
          borderColor: colors.border,
        },
        style,
      ]}
      testID={testID}
    >
      <TouchableOpacity
        onPress={toggle}
        activeOpacity={0.7}
        style={[styles.header, { padding: spacing.md }, headerStyle]}
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        accessibilityLabel={`${title}, ${expanded ? 'collapse' : 'expand'}`}
        testID={`${testID}-toggle`}
      >
        <Text style={[styles.title, { color: colors.text, ...typography.bodyBold }]}>
          {title}
        </Text>
        <Animated.Text
          style={[styles.chevron, { color: colors.textMuted }, chevronStyle]}
        >
          ▼
        </Animated.Text>
      </TouchableOpacity>

      <Animated.View style={bodyStyle}>
        <View
          style={{ paddingHorizontal: spacing.md, paddingBottom: spacing.md }}
        >
          {children}
        </View>
      </Animated.View>

      {/* Hidden measurer */}
      <View
        style={styles.measurer}
        onLayout={handleLayout}
        pointerEvents="none"
      >
        <View style={{ paddingHorizontal: spacing.md, paddingBottom: spacing.md }}>
          {children}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
  },
  chevron: {
    fontSize: 12,
    marginLeft: 8,
  },
  measurer: {
    position: 'absolute',
    opacity: 0,
    zIndex: -1,
    left: 0,
    right: 0,
  },
});
