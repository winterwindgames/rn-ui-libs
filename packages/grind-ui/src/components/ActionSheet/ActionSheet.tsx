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
import type { ActionSheetProps } from './ActionSheet.types';

export const ActionSheet: React.FC<ActionSheetProps> = ({
  visible,
  onClose,
  title,
  options,
  cancelLabel = 'Cancel',
  style,
  testID,
}) => {
  const { colors, spacing, radii, typography, shadows } = useTheme();
  const translateY = useSharedValue(400);
  const backdropOpacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      translateY.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.cubic) });
      backdropOpacity.value = withTiming(1, { duration: 250 });
    } else {
      translateY.value = withTiming(400, { duration: 200 });
      backdropOpacity.value = withTiming(0, { duration: 200 });
    }
  }, [visible]);

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.container}>
        <Animated.View style={[styles.backdrop, backdropStyle]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        </Animated.View>
        <Animated.View
          testID={testID}
          accessibilityRole="menu"
          style={[
            styles.sheet,
            {
              backgroundColor: colors.surface ?? '#272727',
              borderTopLeftRadius: radii.xl,
              borderTopRightRadius: radii.xl,
              paddingBottom: spacing.xl,
              paddingTop: spacing.md,
              ...shadows.lg,
            },
            sheetStyle,
            style,
          ]}
        >
          {title && (
            <View style={[styles.titleRow, { paddingHorizontal: spacing.lg, paddingBottom: spacing.md }]}>
              <Text
                style={{
                  color: colors.textSecondary ?? '#C4CCC2',
                  fontFamily: typography.body.fontFamily,
                  fontSize: 13,
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}
              >
                {title}
              </Text>
            </View>
          )}
          <View
            style={[
              styles.divider,
              { backgroundColor: colors.border ?? '#333', marginHorizontal: spacing.lg },
            ]}
          />
          {options.map((opt, index) => (
            <Pressable
              key={index}
              onPress={() => {
                opt.onPress();
                onClose();
              }}
              accessibilityRole="menuitem"
              accessibilityLabel={opt.label}
              style={({ pressed }) => [
                styles.option,
                {
                  paddingHorizontal: spacing.lg,
                  paddingVertical: spacing.md,
                  backgroundColor: pressed ? (colors.surfaceElevated ?? '#333') : 'transparent',
                },
              ]}
            >
              {opt.icon && <View style={styles.optionIcon}>{opt.icon}</View>}
              <Text
                style={{
                  color: opt.destructive ? '#E37461' : (colors.text ?? '#F8FBFC'),
                  fontFamily: typography.body.fontFamily,
                  fontSize: 16,
                  fontWeight: opt.destructive ? '600' : '400',
                }}
              >
                {opt.label}
              </Text>
            </Pressable>
          ))}
          <View
            style={[
              styles.divider,
              {
                backgroundColor: colors.border ?? '#333',
                marginHorizontal: spacing.lg,
                marginTop: spacing.xs,
              },
            ]}
          />
          <Pressable
            onPress={onClose}
            accessibilityRole="button"
            accessibilityLabel={cancelLabel}
            style={({ pressed }) => [
              styles.option,
              {
                paddingHorizontal: spacing.lg,
                paddingVertical: spacing.md,
                backgroundColor: pressed ? (colors.surfaceElevated ?? '#333') : 'transparent',
              },
            ]}
          >
            <Text
              style={{
                color: colors.primary ?? '#787AF3',
                fontFamily: typography.body.fontFamily,
                fontSize: 16,
                fontWeight: '600',
                textAlign: 'center',
              }}
            >
              {cancelLabel}
            </Text>
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sheet: {
    overflow: 'hidden',
  },
  titleRow: {},
  divider: {
    height: StyleSheet.hairlineWidth,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    marginRight: 12,
  },
});
