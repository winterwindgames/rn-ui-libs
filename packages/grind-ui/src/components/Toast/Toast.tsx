import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
  runOnJS,
  Easing,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import type {
  ToastConfig,
  ToastContextValue,
  ToastPosition,
  ToastProps,
  ToastVariant,
} from './Toast.types';

const ToastContext = createContext<ToastContextValue | null>(null);

let toastCounter = 0;

const VARIANT_COLORS: Record<ToastVariant, { bg: string; text: string; accent: string }> = {
  success: { bg: '#C4CCC2', text: '#242222', accent: '#8A9B86' },
  error: { bg: '#E37461', text: '#FFFFFF', accent: '#C45A49' },
  warning: { bg: '#F2C94C', text: '#242222', accent: '#D4A93A' },
  info: { bg: '#787AF3', text: '#FFFFFF', accent: '#5F61D6' },
};

const VARIANT_ICONS: Record<ToastVariant, string> = {
  success: '✓',
  error: '✕',
  warning: '⚠',
  info: 'ℹ',
};

const ToastItem: React.FC<ToastProps> = ({
  id,
  message,
  variant = 'info',
  action,
  duration = 3000,
  position = 'top',
  onDismiss,
  style,
  testID,
}) => {
  const { spacing, radii, typography, shadows } = useTheme();
  const translateY = useSharedValue(position === 'top' ? -100 : 100);
  const opacity = useSharedValue(0);
  const colors = VARIANT_COLORS[variant];
  const icon = VARIANT_ICONS[variant];

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.cubic) });
    opacity.value = withTiming(1, { duration: 300 });

    if (duration > 0) {
      translateY.value = withDelay(
        duration,
        withTiming(position === 'top' ? -100 : 100, { duration: 300 }, (finished) => {
          if (finished) runOnJS(onDismiss)(id);
        })
      );
      opacity.value = withDelay(duration, withTiming(0, { duration: 300 }));
    }
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const handleDismiss = useCallback(() => {
    translateY.value = withTiming(position === 'top' ? -100 : 100, { duration: 200 }, (finished) => {
      if (finished) runOnJS(onDismiss)(id);
    });
    opacity.value = withTiming(0, { duration: 200 });
  }, [id, onDismiss, position]);

  return (
    <Animated.View
      testID={testID}
      accessibilityRole="alert"
      accessibilityLiveRegion="assertive"
      accessibilityLabel={`${variant} notification: ${message}`}
      style={[
        styles.toast,
        {
          backgroundColor: colors.bg,
          borderRadius: radii.lg,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.sm,
          marginHorizontal: spacing.md,
          marginVertical: spacing.xs,
          ...shadows.sm,
        },
        animatedStyle,
        style,
      ]}
    >
      <View style={styles.iconContainer}>
        <View
          style={[
            styles.iconCircle,
            { backgroundColor: colors.accent, borderRadius: radii.full },
          ]}
        >
          <Text style={[styles.iconText, { color: colors.text }]}>{icon}</Text>
        </View>
      </View>
      <Text
        style={[
          styles.message,
          {
            color: colors.text,
            fontFamily: typography.body.fontFamily,
            fontSize: typography.body.fontSize,
          },
        ]}
        numberOfLines={2}
      >
        {message}
      </Text>
      {action && (
        <Pressable
          onPress={() => {
            action.onPress();
            handleDismiss();
          }}
          accessibilityRole="button"
          accessibilityLabel={action.label}
          style={[styles.actionButton, { borderRadius: radii.sm }]}
        >
          <Text
            style={[
              styles.actionLabel,
              {
                color: colors.text,
                fontFamily: typography.label?.fontFamily ?? typography.body.fontFamily,
                fontWeight: '700',
              },
            ]}
          >
            {action.label}
          </Text>
        </Pressable>
      )}
      <Pressable
        onPress={handleDismiss}
        accessibilityRole="button"
        accessibilityLabel="Dismiss notification"
        hitSlop={8}
        style={styles.closeButton}
      >
        <Text style={{ color: colors.text, fontSize: 16, fontWeight: '700' }}>✕</Text>
      </Pressable>
    </Animated.View>
  );
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<(ToastConfig & { id: string })[]>([]);

  const show = useCallback((config: ToastConfig) => {
    const id = `toast-${++toastCounter}`;
    setToasts((prev) => [...prev, { ...config, id }]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  const topToasts = toasts.filter((t) => (t.position ?? 'top') === 'top');
  const bottomToasts = toasts.filter((t) => t.position === 'bottom');

  return (
    <ToastContext.Provider value={{ show, dismiss, dismissAll }}>
      {children}
      <View style={[styles.container, styles.containerTop]} pointerEvents="box-none">
        {topToasts.map((t) => (
          <ToastItem key={t.id} {...t} position="top" onDismiss={dismiss} />
        ))}
      </View>
      <View style={[styles.container, styles.containerBottom]} pointerEvents="box-none">
        {bottomToasts.map((t) => (
          <ToastItem key={t.id} {...t} position="bottom" onDismiss={dismiss} />
        ))}
      </View>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
};

export { ToastItem as Toast };

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 9999,
  },
  containerTop: {
    top: 60,
  },
  containerBottom: {
    bottom: 40,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
  },
  iconContainer: {
    marginRight: 10,
  },
  iconCircle: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 13,
    fontWeight: '700',
  },
  message: {
    flex: 1,
  },
  actionButton: {
    marginLeft: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  actionLabel: {
    fontSize: 13,
  },
  closeButton: {
    marginLeft: 8,
    padding: 4,
  },
});
