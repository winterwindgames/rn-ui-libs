import React, { useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Modal as RNModal } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { AlertProps } from './Alert.types';

export const Alert: React.FC<AlertProps> = ({
  visible,
  title,
  message,
  actions = [],
  onDismiss,
  style,
  testID,
}) => {
  const { colors, radii, spacing } = useTheme();
  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      scale.value = withTiming(1, { duration: 200 });
      opacity.value = withTiming(1, { duration: 200 });
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <RNModal visible={visible} transparent animationType="none" onRequestClose={onDismiss}>
      <Pressable style={styles.overlay} onPress={onDismiss}>
        <Animated.View
          style={[
            styles.dialog,
            {
              backgroundColor: colors.surface || '#1C1C1E',
              borderRadius: radii?.lg || 16,
              padding: spacing?.lg || 24,
              borderColor: colors.border || '#333333',
            },
            animatedStyle,
            style,
          ]}
          testID={testID}
          accessibilityRole="alert"
        >
          <Pressable>
            <Text style={[styles.title, { color: colors.text || '#FFFFFF' }]}>{title}</Text>
            {message && (
              <Text style={[styles.message, { color: colors.textSecondary || '#8E8E93' }]}>{message}</Text>
            )}
            <View style={styles.actions}>
              {actions.map((action, i) => (
                <Pressable
                  key={i}
                  onPress={action.onPress}
                  style={({ pressed }) => [
                    styles.actionBtn,
                    {
                      backgroundColor: action.variant === 'cancel'
                        ? 'transparent'
                        : action.variant === 'destructive'
                          ? '#FF3B30'
                          : (colors.primary || '#C8FF00'),
                      borderRadius: radii?.md || 8,
                      opacity: pressed ? 0.7 : 1,
                    },
                  ]}
                  accessibilityRole="button"
                >
                  <Text
                    style={[
                      styles.actionText,
                      {
                        color: action.variant === 'cancel'
                          ? (colors.textSecondary || '#8E8E93')
                          : action.variant === 'destructive'
                            ? '#FFFFFF'
                            : '#0D0D0D',
                      },
                    ]}
                  >
                    {action.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </Pressable>
        </Animated.View>
      </Pressable>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  dialog: {
    width: '100%',
    maxWidth: 340,
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  actionBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
