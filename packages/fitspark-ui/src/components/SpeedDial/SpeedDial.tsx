import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
  interpolate,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import type { SpeedDialProps } from './SpeedDial.types';

export const SpeedDial: React.FC<SpeedDialProps> = ({
  icon,
  openIcon,
  actions,
  open,
  onToggle,
  position = 'bottom-right',
  overlay = true,
  style,
  testID,
}) => {
  const { colors, spacing, radii, shadows } = useTheme();
  const progress = useSharedValue(open ? 1 : 0);

  React.useEffect(() => {
    progress.value = withTiming(open ? 1 : 0, { duration: 250 });
  }, [open]);

  const rotateStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${interpolate(progress.value, [0, 1], [0, 45])}deg` }],
  }));

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    pointerEvents: open ? ('auto' as any) : ('none' as any),
  }));

  const positionStyle =
    position === 'bottom-left'
      ? { left: spacing.md ?? 16, bottom: spacing.lg ?? 24 }
      : position === 'bottom-center'
      ? { alignSelf: 'center' as const, bottom: spacing.lg ?? 24 }
      : { right: spacing.md ?? 16, bottom: spacing.lg ?? 24 };

  return (
    <View testID={testID} style={[StyleSheet.absoluteFill, { zIndex: open ? 999 : 1 }]} pointerEvents="box-none">
      {overlay && (
        <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: colors.overlay ?? 'rgba(0,0,0,0.5)' }, overlayStyle]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={onToggle} />
        </Animated.View>
      )}
      <View style={[styles.container, positionStyle, style]} pointerEvents="box-none">
        {actions.map((action, i) => {
          const ActionItem = () => {
            const actionStyle = useAnimatedStyle(() => {
              const translateY = interpolate(progress.value, [0, 1], [20, 0]);
              const opacity = withDelay(
                open ? i * 50 : 0,
                withTiming(open ? 1 : 0, { duration: 150 }),
              );
              return { opacity, transform: [{ translateY }] };
            });

            return (
              <Animated.View key={i} style={[styles.actionRow, actionStyle]}>
                {action.label && (
                  <Animated.Text
                    style={{
                      color: colors.text ?? '#fff',
                      fontSize: 13,
                      fontWeight: '500',
                      marginRight: spacing.sm ?? 8,
                      backgroundColor: colors.surface ?? '#1C1C1E',
                      paddingHorizontal: spacing.sm ?? 8,
                      paddingVertical: spacing.xs ?? 4,
                      borderRadius: radii.sm ?? 8,
                      overflow: 'hidden',
                    }}
                  >
                    {action.label}
                  </Animated.Text>
                )}
                <Pressable
                  onPress={() => {
                    action.onPress?.();
                    onToggle();
                  }}
                  accessibilityRole="button"
                  accessibilityLabel={action.label ?? 'Action'}
                  style={[
                    styles.actionBtn,
                    {
                      backgroundColor: action.color ?? (colors.surface ?? '#1C1C1E'),
                      ...(shadows?.sm ?? {}),
                    },
                  ]}
                >
                  {action.icon}
                </Pressable>
              </Animated.View>
            );
          };
          return <ActionItem key={i} />;
        })}

        <Pressable
          onPress={onToggle}
          accessibilityRole="button"
          accessibilityLabel={open ? 'Close speed dial' : 'Open speed dial'}
          accessibilityState={{ expanded: open }}
          style={[
            styles.fab,
            {
              backgroundColor: colors.primary ?? '#C8FF00',
              ...(shadows?.md ?? {}),
            },
          ]}
        >
          <Animated.View style={rotateStyle}>
            {open && openIcon ? openIcon : icon}
          </Animated.View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'flex-end',
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
