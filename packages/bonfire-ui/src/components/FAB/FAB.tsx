import React, { useCallback } from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Pressable } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { FABProps } from './FAB.types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const FAB: React.FC<FABProps> = ({
  icon, onPress, position = 'bottom-right', extended, label, color = 'primary', style, testID,
}) => {
  const { colors, radii, shadows } = useTheme();
  const scale = useSharedValue(1);
  const resolvedColor = (colors as Record<string, string>)[color] ?? color;

  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const posStyle = position === 'bottom-right' ? { right: 20, bottom: 80 }
    : position === 'bottom-left' ? { left: 20, bottom: 80 }
    : { alignSelf: 'center' as const, bottom: 80 };

  return (
    <AnimatedPressable testID={testID} onPress={onPress}
      onPressIn={() => { scale.value = withSpring(0.9); }}
      onPressOut={() => { scale.value = withSpring(1); }}
      accessibilityRole="button" accessibilityLabel={label || 'Action'}
      style={[styles.fab, { backgroundColor: resolvedColor, borderRadius: extended ? radii.pill : radii.full, ...shadows.md, ...posStyle }, animatedStyle, style]}>
      {icon}
      {extended && label && <Text style={styles.label}>{label}</Text>}
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  fab: { position: 'absolute', width: 56, height: 56, alignItems: 'center', justifyContent: 'center', zIndex: 100, flexDirection: 'row' },
  label: { color: '#fff', fontWeight: '600', marginLeft: 8 },
});
