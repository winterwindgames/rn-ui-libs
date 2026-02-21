import React, { useCallback, useEffect } from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolateColor,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { SwitchProps, SwitchSize } from './Switch.types';

const SIZE_CONFIG: Record<SwitchSize, { trackW: number; trackH: number; thumb: number; travel: number }> = {
  sm: { trackW: 40, trackH: 24, thumb: 18, travel: 18 },
  md: { trackW: 52, trackH: 30, thumb: 24, travel: 24 },
};

export const Switch: React.FC<SwitchProps> = ({
  value = false,
  onToggle,
  label,
  disabled = false,
  color = 'primary',
  size = 'md',
  style,
  testID,
}) => {
  const { colors, typography } = useTheme();
  const resolvedColor = (colors as Record<string, string>)[color] ?? color;
  const sizeConfig = SIZE_CONFIG[size];
  const progress = useSharedValue(value ? 1 : 0);

  useEffect(() => {
    progress.value = withSpring(value ? 1 : 0, { damping: 15, stiffness: 200 });
  }, [value, progress]);

  const handlePress = useCallback(() => {
    if (!disabled) onToggle?.(!value);
  }, [disabled, value, onToggle]);

  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [colors.surfaceElevated ?? '#3a3a3a', resolvedColor],
    ),
  }));

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: progress.value * sizeConfig.travel }],
  }));

  return (
    <Pressable
      testID={testID}
      onPress={handlePress}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
      accessibilityLabel={label}
      style={[styles.container, { opacity: disabled ? 0.5 : 1 }, style]}
    >
      <Animated.View
        style={[
          styles.track,
          {
            width: sizeConfig.trackW,
            height: sizeConfig.trackH,
            borderRadius: sizeConfig.trackH / 2,
          },
          trackStyle,
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            {
              width: sizeConfig.thumb,
              height: sizeConfig.thumb,
              borderRadius: sizeConfig.thumb / 2,
              backgroundColor: colors.textInverse ?? '#F8FBFC',
            },
            thumbStyle,
          ]}
        />
      </Animated.View>

      {label && (
        <Text
          style={[
            styles.label,
            {
              color: colors.text ?? '#F8FBFC',
              fontFamily: typography.body.fontFamily ?? undefined,
              fontSize: size === 'sm' ? 13 : 15,
            },
          ]}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  track: {
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  thumb: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  label: {
    marginLeft: 12,
  },
});
