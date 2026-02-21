import React, { useEffect } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import type { AlertProps, AlertVariant } from './Alert.types';

const VARIANT_COLORS: Record<string, { accent: string; button: string }> = {
  info: { accent: '#787AF3', button: '#787AF3' },
  danger: { accent: '#E37461', button: '#E37461' },
  error: { accent: '#E37461', button: '#E37461' },
  warning: { accent: '#F2C94C', button: '#D4A93A' },
  success: { accent: '#C4CCC2', button: '#6B8068' },
};

export const Alert: React.FC<AlertProps> = ({
  visible,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'info',
  style,
  testID,
}) => {
  const { colors, spacing, radii, typography, shadows } = useTheme();
  const scale = useSharedValue(0.85);
  const opacity = useSharedValue(0);
  const variantColors = VARIANT_COLORS[variant] ?? VARIANT_COLORS.info;

  useEffect(() => {
    if (visible) {
      scale.value = withTiming(1, { duration: 250, easing: Easing.out(Easing.cubic) });
      opacity.value = withTiming(1, { duration: 200 });
    } else {
      scale.value = withTiming(0.85, { duration: 150 });
      opacity.value = withTiming(0, { duration: 150 });
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onCancel}
      statusBarTranslucent
    >
      <View style={styles.backdrop} testID={testID ? `${testID}-backdrop` : undefined}>
        <Pressable style={styles.backdropPress} onPress={onCancel} />
        <Animated.View
          testID={testID}
          accessibilityRole="alert"
          accessibilityLabel={`${title}. ${message ?? ''}`}
          style={[
            styles.dialog,
            {
              backgroundColor: colors.surface ?? '#272727',
              borderRadius: radii.xl,
              padding: spacing.lg,
              ...shadows.md,
            },
            animatedStyle,
            style,
          ]}
        >
          <View
            style={[
              styles.iconBar,
              { backgroundColor: variantColors.accent, borderRadius: radii.xs },
            ]}
          />
          <Text
            style={[
              styles.title,
              {
                color: colors.text ?? '#F8FBFC',
                fontFamily: typography.h5?.fontFamily ?? typography.body.fontFamily,
                fontSize: typography.h5?.fontSize ?? 18,
                fontWeight: '700',
                marginBottom: spacing.sm,
              },
            ]}
          >
            {title}
          </Text>
          {message ? (
            <Text
              style={[
                styles.message,
                {
                  color: colors.textSecondary ?? '#C4CCC2',
                  fontFamily: typography.body.fontFamily,
                  fontSize: typography.body.fontSize,
                  marginBottom: spacing.lg,
                  lineHeight: (typography.body.fontSize ?? 14) * 1.5,
                },
              ]}
            >
              {message}
            </Text>
          ) : null}
          <View style={styles.actions}>
            <Pressable
              onPress={onCancel}
              accessibilityRole="button"
              accessibilityLabel={cancelLabel}
              style={[
                styles.button,
                {
                  backgroundColor: colors.surfaceElevated ?? '#333',
                  borderRadius: radii.md,
                  paddingVertical: spacing.sm,
                  paddingHorizontal: spacing.lg,
                  marginRight: spacing.sm,
                },
              ]}
            >
              <Text
                style={{
                  color: colors.text ?? '#F8FBFC',
                  fontFamily: typography.body.fontFamily,
                  fontSize: 14,
                  fontWeight: '600',
                  textAlign: 'center',
                }}
              >
                {cancelLabel}
              </Text>
            </Pressable>
            <Pressable
              onPress={onConfirm}
              accessibilityRole="button"
              accessibilityLabel={confirmLabel}
              style={[
                styles.button,
                {
                  backgroundColor: variantColors.button,
                  borderRadius: radii.md,
                  paddingVertical: spacing.sm,
                  paddingHorizontal: spacing.lg,
                },
              ]}
            >
              <Text
                style={{
                  color: '#FFFFFF',
                  fontFamily: typography.body.fontFamily,
                  fontSize: 14,
                  fontWeight: '600',
                  textAlign: 'center',
                }}
              >
                {confirmLabel}
              </Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdropPress: {
    ...StyleSheet.absoluteFillObject,
  },
  dialog: {
    width: '85%',
    maxWidth: 400,
    overflow: 'hidden',
  },
  iconBar: {
    width: 40,
    height: 4,
    marginBottom: 16,
  },
  title: {},
  message: {},
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    flex: 1,
  },
});
