import React, { useState, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet, LayoutChangeEvent } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { AccordionProps, AccordionItemProps } from './Accordion.types';

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  subtitle,
  leftIcon,
  defaultExpanded = false,
  disabled = false,
  children,
}) => {
  const { colors, spacing, typography, radii } = useTheme();
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [contentHeight, setContentHeight] = useState(0);
  const progress = useSharedValue(defaultExpanded ? 1 : 0);

  const onContentLayout = useCallback((e: LayoutChangeEvent) => {
    const h = e.nativeEvent.layout.height;
    if (h > 0) setContentHeight(h);
  }, []);

  const toggle = useCallback(() => {
    if (disabled) return;
    const next = !expanded;
    setExpanded(next);
    progress.value = withTiming(next ? 1 : 0, {
      duration: 250,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    });
  }, [disabled, expanded, progress]);

  const bodyStyle = useAnimatedStyle(() => ({
    height: contentHeight > 0 ? interpolate(progress.value, [0, 1], [0, contentHeight]) : undefined,
    opacity: progress.value,
    overflow: 'hidden' as const,
  }));

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${interpolate(progress.value, [0, 1], [0, 180])}deg` }],
  }));

  return (
    <View
      style={[
        styles.item,
        { borderBottomColor: colors.border },
      ]}
      accessibilityRole="button"
      accessibilityState={{ expanded, disabled }}
    >
      <Pressable
        onPress={toggle}
        disabled={disabled}
        style={[
          styles.header,
          { paddingVertical: spacing.md, paddingHorizontal: spacing.md },
          disabled && { opacity: 0.4 },
        ]}
      >
        {leftIcon && <View style={{ marginRight: spacing.sm }}>{leftIcon}</View>}
        <View style={styles.headerContent}>
          <Text style={[typography.body, { color: colors.text, fontWeight: '600' }]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={[typography.bodySm, { color: colors.textSecondary, marginTop: 2 }]}>
              {subtitle}
            </Text>
          )}
        </View>
        <Animated.View style={chevronStyle}>
          <Text style={{ color: colors.textSecondary, fontSize: 16 }}>▼</Text>
        </Animated.View>
      </Pressable>
      <Animated.View style={bodyStyle}>
        <View
          onLayout={onContentLayout}
          style={{ paddingHorizontal: spacing.md, paddingBottom: spacing.md }}
        >
          {children}
        </View>
      </Animated.View>
    </View>
  );
};

export const Accordion: React.FC<AccordionProps> = ({
  children,
  style,
  testID,
}) => {
  const { colors, radii } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          borderRadius: radii.lg,
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
          overflow: 'hidden',
        },
        style,
      ]}
      testID={testID}
      accessibilityRole="none"
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  item: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
  },
});
