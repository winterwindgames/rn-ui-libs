import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import type { FABProps } from './FAB.types';

const SIZE_MAP = { sm: 40, md: 56, lg: 72 };

export const FAB: React.FC<FABProps> = ({
  icon,
  label,
  onPress,
  position = 'bottomRight',
  color,
  size = 'md',
  style,
  testID,
}) => {
  const { colors, spacing, radii, typography, shadows } = useTheme();
  const bgColor = color ?? colors.primary;
  const dimension = SIZE_MAP[size];
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.9, { damping: 15 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15 });
  };

  const positionStyle = {
    bottomRight: { bottom: spacing.lg, right: spacing.lg },
    bottomLeft: { bottom: spacing.lg, left: spacing.lg },
    bottomCenter: { bottom: spacing.lg, alignSelf: 'center' as const, left: 0, right: 0 },
  }[position];

  const isExtended = !!label;

  return (
    <Animated.View
      style={[
        styles.container,
        positionStyle,
        isExtended ? {} : { width: dimension, height: dimension },
        animatedStyle,
        position === 'bottomCenter' && styles.center,
      ]}
    >
      <TouchableOpacity
        testID={testID}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        accessibilityRole="button"
        accessibilityLabel={label ?? 'Floating action button'}
        activeOpacity={0.8}
        style={[
          styles.button,
          {
            backgroundColor: bgColor,
            borderRadius: isExtended ? radii.xl : dimension / 2,
            height: dimension,
            paddingHorizontal: isExtended ? spacing.lg : 0,
            ...shadows.lg,
          },
          style,
        ]}
      >
        {icon}
        {label && (
          <Text
            style={[
              styles.label,
              {
                color: '#fff',
                fontSize: typography.bodySm.fontSize,
                fontWeight: typography.h1.fontWeight as any,
                marginLeft: spacing.sm,
                textTransform: 'uppercase',
                letterSpacing: 1.2,
              },
            ]}
          >
            {label}
          </Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 100,
  },
  center: {
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {},
});
