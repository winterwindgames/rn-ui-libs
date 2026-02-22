import React, { useEffect } from 'react';
import { View, Pressable, StyleSheet, Dimensions, Modal } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import type { BottomSheetProps } from './BottomSheet.types';

const { height: SCREEN_H } = Dimensions.get('window');

export const BottomSheet: React.FC<BottomSheetProps> = ({
  visible = false, snapPoints = [50], onClose, handle = true, children, style, testID,
}) => {
  const { colors, radii, spacing, shadows } = useTheme();
  const sheetHeight = SCREEN_H * (snapPoints[0] / 100);
  const translateY = useSharedValue(sheetHeight);

  useEffect(() => {
    translateY.value = withTiming(visible ? 0 : sheetHeight, { duration: 300 });
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({ transform: [{ translateY: translateY.value }] }));

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: colors.overlay }]} onPress={onClose} />
      <Animated.View testID={testID} style={[styles.sheet, { height: sheetHeight, backgroundColor: colors.surface, borderTopLeftRadius: radii.xl, borderTopRightRadius: radii.xl, ...shadows.lg }, animatedStyle, style]}>
        {handle && <View style={[styles.handle, { backgroundColor: colors.border }]} />}
        <View style={{ flex: 1, padding: spacing.md }}>{children}</View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  sheet: { position: 'absolute', bottom: 0, left: 0, right: 0 },
  handle: { width: 40, height: 4, borderRadius: 2, alignSelf: 'center', marginTop: 8, marginBottom: 8 },
});
