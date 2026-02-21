import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
  runOnJS,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { ToastConfig, ToastContextValue, ToastProviderProps, ToastItemProps, ToastType } from './Toast.types';

const ToastContext = createContext<ToastContextValue | null>(null);

const TYPE_COLORS: Record<ToastType, string> = {
  success: '#C8FF00',
  error: '#FF3B30',
  warning: '#FF9500',
  info: '#007AFF',
};

const ToastItem: React.FC<ToastItemProps> = ({ toast, onDismiss }) => {
  const { colors, radii, spacing } = useTheme();
  const translateY = useSharedValue(-100);
  const opacity = useSharedValue(0);
  const accentColor = TYPE_COLORS[toast.type || 'info'];

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 300 });
    opacity.value = withTiming(1, { duration: 300 });

    const duration = toast.duration || 3000;
    const timer = setTimeout(() => {
      dismiss();
    }, duration);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    translateY.value = withTiming(-100, { duration: 250 });
    opacity.value = withTiming(0, { duration: 250 }, () => {
      runOnJS(onDismiss)(toast.id);
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.toast,
        {
          backgroundColor: colors.surface || '#1C1C1E',
          borderRadius: radii?.md || 12,
          borderLeftColor: accentColor,
          marginHorizontal: spacing?.md || 16,
          padding: spacing?.md || 16,
        },
        animatedStyle,
      ]}
      accessibilityRole="alert"
      accessibilityLabel={toast.message}
    >
      <View style={[styles.accentBar, { backgroundColor: accentColor }]} />
      <Text style={[styles.message, { color: colors.text || '#FFFFFF' }]}>{toast.message}</Text>
      {toast.action && (
        <Pressable onPress={toast.action.onPress} style={styles.actionBtn}>
          <Text style={[styles.actionText, { color: accentColor }]}>{toast.action.label}</Text>
        </Pressable>
      )}
    </Animated.View>
  );
};

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastConfig[]>([]);
  const counter = useRef(0);

  const show = useCallback((config: Omit<ToastConfig, 'id'>) => {
    const id = `toast-${++counter.current}`;
    setToasts((prev) => [...prev, { ...config, id }]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  return (
    <ToastContext.Provider value={{ show, dismiss, dismissAll }}>
      {children}
      <View style={styles.container} pointerEvents="box-none">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={dismiss} />
        ))}
      </View>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    zIndex: 9999,
    gap: 8,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  accentBar: {
    width: 0,
    height: 0,
  },
  message: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  actionBtn: {
    marginLeft: 12,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '700',
  },
});
