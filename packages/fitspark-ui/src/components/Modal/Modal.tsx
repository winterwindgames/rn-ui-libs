import React, { useEffect } from 'react';
import { Pressable, StyleSheet, Modal as RNModal } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { ModalProps } from './Modal.types';

export const Modal: React.FC<ModalProps> = ({
  visible,
  onDismiss,
  children,
  dismissOnBackdrop = true,
  style,
  testID,
}) => {
  const { colors, radii, spacing } = useTheme();
  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      scale.value = withTiming(1, { duration: 250 });
      opacity.value = withTiming(1, { duration: 250 });
    } else {
      scale.value = 0.9;
      opacity.value = 0;
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <RNModal visible={visible} transparent animationType="none" onRequestClose={onDismiss}>
      <Pressable
        style={styles.overlay}
        onPress={dismissOnBackdrop ? onDismiss : undefined}
      >
        <Animated.View
          style={[
            styles.content,
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
          accessibilityViewIsModal
        >
          <Pressable>{children}</Pressable>
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
    padding: 24,
  },
  content: {
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
  },
});
