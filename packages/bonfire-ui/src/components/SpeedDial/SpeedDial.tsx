import React, { useState, useCallback } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../Text/Text';
import type { SpeedDialProps } from './SpeedDial.types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const SpeedDial: React.FC<SpeedDialProps> = ({
  icon,
  actions,
  color,
  style,
  testID,
}) => {
  const { colors, spacing, shadows } = useTheme();
  const [open, setOpen] = useState(false);
  const rotation = useSharedValue(0);
  const bg = color ?? colors.primary;

  const toggle = useCallback(() => {
    setOpen((prev) => {
      rotation.value = withSpring(prev ? 0 : 45, { damping: 15, stiffness: 200 });
      return !prev;
    });
  }, [rotation]);

  const rotateStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View testID={testID} style={[styles.container, style]}>
      {open && actions.map((action, i) => (
        <Animated.View key={i} style={[styles.actionRow, { marginBottom: spacing.sm }]}>
          <Text variant="caption" color={colors.text} style={[styles.label, { backgroundColor: colors.surfaceElevated, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs, borderRadius: 4 }]}>{action.label}</Text>
          <Pressable
            onPress={() => { action.onPress(); setOpen(false); }}
            accessibilityRole="button"
            accessibilityLabel={action.label}
            style={[styles.actionBtn, { backgroundColor: colors.surface, width: 44, height: 44, borderRadius: 22 }, shadows.md]}
          >
            {action.icon}
          </Pressable>
        </Animated.View>
      ))}
      <AnimatedPressable
        onPress={toggle}
        accessibilityRole="button"
        accessibilityLabel="Speed dial"
        style={[styles.mainBtn, { backgroundColor: bg, width: 56, height: 56, borderRadius: 28 }, shadows.lg, rotateStyle]}
      >
        {icon}
      </AnimatedPressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { position: 'absolute', bottom: 24, right: 24, alignItems: 'flex-end' },
  actionRow: { flexDirection: 'row', alignItems: 'center' },
  label: { marginRight: 8 },
  actionBtn: { alignItems: 'center', justifyContent: 'center' },
  mainBtn: { alignItems: 'center', justifyContent: 'center' },
});
