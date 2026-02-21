import React, { useEffect } from 'react';
import {
  Dimensions,
  Modal as RNModal,
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
import type { ModalProps, ModalSize } from './Modal.types';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const SIZE_MAP: Record<ModalSize, { width: number | string; maxHeight: number | string }> = {
  sm: { width: SCREEN_WIDTH * 0.7, maxHeight: SCREEN_HEIGHT * 0.4 },
  md: { width: SCREEN_WIDTH * 0.85, maxHeight: SCREEN_HEIGHT * 0.6 },
  lg: { width: SCREEN_WIDTH * 0.95, maxHeight: SCREEN_HEIGHT * 0.85 },
  full: { width: '100%', maxHeight: '100%' },
};

export const Modal: React.FC<ModalProps> = ({
  visible,
  onClose,
  title,
  closeButton = true,
  size = 'md',
  children,
  style,
  testID,
}) => {
  const { colors, spacing, radii, typography, shadows } = useTheme();
  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      scale.value = withTiming(1, { duration: 250, easing: Easing.out(Easing.cubic) });
      opacity.value = withTiming(1, { duration: 200 });
    } else {
      scale.value = withTiming(0.9, { duration: 150 });
      opacity.value = withTiming(0, { duration: 150 });
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const sizeStyle = SIZE_MAP[size];
  const isFullScreen = size === 'full';

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.backdrop}>
        <Pressable style={styles.backdropPress} onPress={onClose} />
        <Animated.View
          testID={testID}
          accessibilityRole="none"
          accessibilityViewIsModal
          style={[
            styles.modal,
            {
              backgroundColor: colors.surface ?? '#272727',
              borderRadius: isFullScreen ? 0 : radii.xl,
              ...shadows.md,
              width: sizeStyle.width as any,
              maxHeight: sizeStyle.maxHeight as any,
            },
            animatedStyle,
            style,
          ]}
        >
          {(title || closeButton) && (
            <View
              style={[
                styles.header,
                {
                  paddingHorizontal: spacing.lg,
                  paddingTop: spacing.lg,
                  paddingBottom: spacing.sm,
                },
              ]}
            >
              {title ? (
                <Text
                  accessibilityRole="header"
                  style={{
                    color: colors.text ?? '#F8FBFC',
                    fontFamily: typography.h5?.fontFamily ?? typography.body.fontFamily,
                    fontSize: typography.h5?.fontSize ?? 18,
                    fontWeight: '700',
                    flex: 1,
                  }}
                >
                  {title}
                </Text>
              ) : (
                <View style={{ flex: 1 }} />
              )}
              {closeButton && (
                <Pressable
                  onPress={onClose}
                  accessibilityRole="button"
                  accessibilityLabel="Close modal"
                  hitSlop={8}
                  style={[
                    styles.closeBtn,
                    {
                      backgroundColor: colors.surfaceElevated ?? '#333',
                      borderRadius: radii.full,
                    },
                  ]}
                >
                  <Text style={{ color: colors.text ?? '#F8FBFC', fontSize: 16, fontWeight: '600' }}>
                    ✕
                  </Text>
                </Pressable>
              )}
            </View>
          )}
          <View style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.lg }}>
            {children}
          </View>
        </Animated.View>
      </View>
    </RNModal>
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
  modal: {
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
