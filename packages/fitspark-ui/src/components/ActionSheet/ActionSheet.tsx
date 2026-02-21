import React, { useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Modal as RNModal } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { ActionSheetProps } from './ActionSheet.types';

export const ActionSheet: React.FC<ActionSheetProps> = ({
  visible,
  title,
  message,
  options,
  cancelLabel = 'Cancel',
  onDismiss,
  style,
  testID,
}) => {
  const { colors, radii, spacing } = useTheme();
  const translateY = useSharedValue(400);
  const backdropOpacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      translateY.value = withTiming(0, { duration: 300 });
      backdropOpacity.value = withTiming(0.6, { duration: 300 });
    } else {
      translateY.value = withTiming(400, { duration: 250 });
      backdropOpacity.value = withTiming(0, { duration: 250 });
    }
  }, [visible]);

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const bgStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  return (
    <RNModal visible={visible} transparent animationType="none" onRequestClose={onDismiss}>
      <View style={styles.container}>
        <Pressable style={styles.backdrop} onPress={onDismiss}>
          <Animated.View style={[styles.backdropFill, bgStyle]} />
        </Pressable>
        <Animated.View
          style={[
            styles.sheet,
            { paddingHorizontal: spacing?.md || 16, paddingBottom: spacing?.xl || 32 },
            sheetStyle,
            style,
          ]}
          testID={testID}
        >
          <View
            style={[
              styles.optionsGroup,
              { backgroundColor: colors.surface || '#1C1C1E', borderRadius: radii?.lg || 16 },
            ]}
          >
            {(title || message) && (
              <View style={[styles.header, { borderBottomColor: colors.border || '#333333' }]}>
                {title && <Text style={[styles.title, { color: colors.textSecondary || '#8E8E93' }]}>{title}</Text>}
                {message && <Text style={[styles.message, { color: colors.textSecondary || '#8E8E93' }]}>{message}</Text>}
              </View>
            )}
            {options.map((option, i) => (
              <Pressable
                key={i}
                onPress={option.onPress}
                disabled={option.disabled}
                style={({ pressed }) => [
                  styles.option,
                  i < options.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border || '#333333' },
                  pressed && { backgroundColor: (colors.surfaceSecondary || '#2A2A2A') },
                  option.disabled && styles.disabled,
                ]}
                accessibilityRole="button"
                accessibilityLabel={option.label}
              >
                {option.icon && <View style={styles.optionIcon}>{option.icon}</View>}
                <Text
                  style={[
                    styles.optionLabel,
                    { color: option.destructive ? '#FF3B30' : (colors.text || '#FFFFFF') },
                  ]}
                >
                  {option.label}
                </Text>
              </Pressable>
            ))}
          </View>
          <Pressable
            onPress={onDismiss}
            style={({ pressed }) => [
              styles.cancelBtn,
              {
                backgroundColor: colors.surface || '#1C1C1E',
                borderRadius: radii?.lg || 16,
                opacity: pressed ? 0.7 : 1,
              },
            ]}
            accessibilityRole="button"
          >
            <Text style={[styles.cancelText, { color: colors.accent || '#C8FF00' }]}>{cancelLabel}</Text>
          </Pressable>
        </Animated.View>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  backdropFill: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  sheet: {},
  optionsGroup: {
    overflow: 'hidden',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  message: {
    fontSize: 12,
    marginTop: 4,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  optionIcon: {
    marginRight: 10,
  },
  optionLabel: {
    fontSize: 18,
    fontWeight: '400',
  },
  cancelBtn: {
    marginTop: 8,
    padding: 16,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 18,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.4,
  },
});
