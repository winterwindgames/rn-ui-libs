import React, { useState, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import type { AccordionProps, AccordionItemProps } from './Accordion.types';

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title, expanded: controlledExpanded, onToggle, children, style, testID,
}) => {
  const { colors, spacing, radii, typography } = useTheme();
  const [internalExpanded, setInternalExpanded] = useState(false);
  const expanded = controlledExpanded ?? internalExpanded;
  const rotation = useSharedValue(0);

  const toggle = useCallback(() => {
    if (onToggle) onToggle();
    else setInternalExpanded(e => !e);
  }, [onToggle]);

  React.useEffect(() => {
    rotation.value = withTiming(expanded ? 180 : 0, { duration: 200 });
  }, [expanded]);

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View testID={testID} style={[{ borderBottomWidth: 1, borderBottomColor: colors.borderLight }, style]}>
      <Pressable onPress={toggle} accessibilityRole="button" accessibilityState={{ expanded }}
        style={[styles.header, { paddingVertical: spacing.md }]}>
        <Text style={{ color: colors.text, ...typography.h6, flex: 1 }}>{title}</Text>
        <Animated.View style={chevronStyle}>
          <Text style={{ color: colors.textMuted, fontSize: 16 }}>▼</Text>
        </Animated.View>
      </Pressable>
      {expanded && <View style={{ paddingBottom: spacing.md }}>{children}</View>}
    </View>
  );
};

export const Accordion: React.FC<AccordionProps> = ({ children, style, testID }) => {
  const { colors, radii } = useTheme();
  return (
    <View testID={testID} style={[{ borderRadius: radii.lg, overflow: 'hidden' }, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
