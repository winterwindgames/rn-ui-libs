import React, { useState, useEffect } from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  interpolate,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import type { SpeedDialProps } from './SpeedDial.types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const SpeedDial: React.FC<SpeedDialProps> = ({
  icon,
  openIcon,
  actions,
  open: controlledOpen,
  onToggle,
  position = 'bottom-right',
  overlay = true,
  style,
  testID,
}) => {
  const { colors, spacing, radii, shadows, typography } = useTheme();
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen ?? internalOpen;
  const progress = useSharedValue(0);
  const rotation = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(isOpen ? 1 : 0, { duration: 250 });
    rotation.value = withTiming(isOpen ? 45 : 0, { duration: 250 });
  }, [isOpen, progress, rotation]);

  const toggle = () => {
    const next = !isOpen;
    if (controlledOpen === undefined) setInternalOpen(next);
    onToggle?.(next);
  };

  const handleActionPress = (onPress: () => void) => {
    onPress();
    if (controlledOpen === undefined) setInternalOpen(false);
    onToggle?.(false);
  };

  const mainIconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    pointerEvents: isOpen ? ('auto' as const) : ('none' as const),
  }));

  const positionStyle = (() => {
    switch (position) {
      case 'bottom-left':
        return { left: spacing.md ?? 16, bottom: spacing.md ?? 16 };
      case 'bottom-center':
        return { alignSelf: 'center' as const, bottom: spacing.md ?? 16 };
      case 'bottom-right':
      default:
        return { right: spacing.md ?? 16, bottom: spacing.md ?? 16 };
    }
  })();

  return (
    <>
      {overlay && (
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: colors.overlay ?? 'rgba(0,0,0,0.5)' },
            backdropStyle,
          ]}
        >
          <Pressable style={StyleSheet.absoluteFill} onPress={toggle} />
        </Animated.View>
      )}
      <View
        testID={testID}
        style={[styles.container, { position: 'absolute', ...positionStyle }, style]}
      >
        {actions.map((action, index) => {
          const ActionItem = () => {
            const actionStyle = useAnimatedStyle(() => {
              const translateY = interpolate(
                progress.value,
                [0, 1],
                [0, -(56 + spacing.sm) * (index + 1)],
              );
              return {
                opacity: progress.value,
                transform: [{ translateY }, { scale: interpolate(progress.value, [0, 1], [0.4, 1]) }],
              };
            });

            return (
              <Animated.View key={`action-${index}`} style={[styles.actionRow, actionStyle]}>
                {action.label && (
                  <View
                    style={[
                      styles.label,
                      {
                        backgroundColor: colors.surfaceElevated ?? '#fff',
                        paddingHorizontal: spacing.sm ?? 8,
                        paddingVertical: spacing.xs ?? 4,
                        borderRadius: radii.sm ?? 8,
                        ...shadows.sm,
                        marginRight: spacing.sm ?? 8,
                      },
                    ]}
                  >
                    <Text
                      style={{
                        ...typography.bodySm,
                        color: colors.text ?? '#242222',
                      }}
                    >
                      {action.label}
                    </Text>
                  </View>
                )}
                <Pressable
                  onPress={() => handleActionPress(action.onPress)}
                  accessibilityRole="button"
                  accessibilityLabel={action.label ?? `Action ${index + 1}`}
                  style={[
                    styles.actionButton,
                    {
                      backgroundColor: action.color ?? (colors.secondary ?? '#E37461'),
                      ...shadows.md,
                      borderRadius: radii.full ?? 9999,
                    },
                  ]}
                >
                  {action.icon}
                </Pressable>
              </Animated.View>
            );
          };

          return <ActionItem key={index} />;
        })}

        <AnimatedPressable
          onPress={toggle}
          accessibilityRole="button"
          accessibilityLabel={isOpen ? 'Close speed dial' : 'Open speed dial'}
          accessibilityState={{ expanded: isOpen }}
          style={[
            styles.mainButton,
            {
              backgroundColor: colors.primary ?? '#787AF3',
              borderRadius: radii.full ?? 9999,
              ...shadows.lg,
            },
          ]}
        >
          <Animated.View style={mainIconStyle}>
            {isOpen && openIcon ? openIcon : icon}
          </Animated.View>
        </AnimatedPressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  mainButton: {
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionRow: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {},
});
