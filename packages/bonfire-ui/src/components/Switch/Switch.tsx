import React, { useCallback, useEffect } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../Text/Text';
import type { SwitchProps } from './Switch.types';

const TRACK_W = 50;
const TRACK_H = 30;
const THUMB_SIZE = 24;

export const Switch: React.FC<SwitchProps> = ({
  value,
  onChange,
  label,
  disabled = false,
  color,
  style,
  testID,
}) => {
  const { colors } = useTheme();
  const accentColor = color ?? colors.primary;
  const translateX = useSharedValue(value ? TRACK_W - THUMB_SIZE - 4 : 3);

  useEffect(() => {
    translateX.value = withSpring(value ? TRACK_W - THUMB_SIZE - 4 : 3, { damping: 15, stiffness: 300 });
  }, [value, translateX]);

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const handlePress = useCallback(() => {
    if (!disabled) onChange(!value);
  }, [value, disabled, onChange]);

  return (
    <Pressable
      testID={testID}
      onPress={handlePress}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
      accessibilityLabel={label}
      style={[styles.container, style]}
    >
      <View style={[styles.track, { width: TRACK_W, height: TRACK_H, borderRadius: TRACK_H / 2, backgroundColor: value ? accentColor : colors.border, opacity: disabled ? 0.5 : 1 }]}>
        <Animated.View style={[styles.thumb, { width: THUMB_SIZE, height: THUMB_SIZE, borderRadius: THUMB_SIZE / 2, backgroundColor: '#FFFFFF' }, thumbStyle]} />
      </View>
      {label && <Text variant="body" color={disabled ? colors.disabledText : colors.text} style={{ marginLeft: 10 }}>{label}</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  track: { justifyContent: 'center' },
  thumb: { position: 'absolute' },
});
