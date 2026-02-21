import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { PopoverProps } from './Popover.types';

export const Popover: React.FC<PopoverProps> = ({
  visible,
  onDismiss,
  content,
  placement = 'bottom',
  children,
  style,
  testID,
}) => {
  const { colors, radii, shadows } = useTheme();
  const opacity = useSharedValue(visible ? 1 : 0);
  const scale = useSharedValue(visible ? 1 : 0.9);

  React.useEffect(() => {
    opacity.value = withTiming(visible ? 1 : 0, { duration: 200 });
    scale.value = withTiming(visible ? 1 : 0.9, { duration: 200 });
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const posStyle: Record<string, any> = {
    top: { bottom: '100%', marginBottom: 8 },
    bottom: { top: '100%', marginTop: 8 },
    left: { right: '100%', marginRight: 8 },
    right: { left: '100%', marginLeft: 8 },
  };

  return (
    <View style={[styles.wrapper, style]} testID={testID}>
      {children}
      {visible && (
        <>
          <Pressable style={styles.backdrop} onPress={onDismiss} />
          <Animated.View
            style={[
              styles.popover,
              {
                backgroundColor: colors.surface || '#1C1C1E',
                borderRadius: radii?.md || 12,
                borderColor: colors.border || '#333333',
                ...(shadows as any)?.md,
              },
              posStyle[placement],
              animatedStyle,
            ]}
          >
            {content}
          </Animated.View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    zIndex: 100,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    position: 'fixed' as any,
    top: -9999,
    left: -9999,
    right: -9999,
    bottom: -9999,
  },
  popover: {
    position: 'absolute',
    borderWidth: 1,
    padding: 12,
    minWidth: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
    zIndex: 101,
  },
});
