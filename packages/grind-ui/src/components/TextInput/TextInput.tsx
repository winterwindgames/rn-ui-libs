import React, { useState, useCallback } from 'react';
import {
  View,
  TextInput as RNTextInput,
  Text,
  StyleSheet,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { TextInputProps, TextInputSize } from './TextInput.types';

const SIZE_CONFIG: Record<TextInputSize, { height: number; fontSize: number; paddingH: number }> = {
  sm: { height: 36, fontSize: 13, paddingH: 12 },
  md: { height: 44, fontSize: 15, paddingH: 16 },
  lg: { height: 52, fontSize: 17, paddingH: 16 },
};

export const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  leftIcon,
  rightIcon,
  helperText,
  error = false,
  errorMessage,
  disabled = false,
  secureTextEntry = false,
  maxLength,
  showCharCount = false,
  size = 'md',
  style,
  testID,
}) => {
  const { colors, radii, typography, spacing } = useTheme();
  const [focused, setFocused] = useState(false);
  const borderProgress = useSharedValue(0);

  const hasError = error || !!errorMessage;
  const sizeConfig = SIZE_CONFIG[size];

  const handleFocus = useCallback(() => {
    setFocused(true);
    borderProgress.value = withTiming(1, { duration: 200 });
  }, [borderProgress]);

  const handleBlur = useCallback(() => {
    setFocused(false);
    borderProgress.value = withTiming(0, { duration: 200 });
  }, [borderProgress]);

  const borderColor = hasError
    ? (colors.error ?? '#E37461')
    : focused
      ? (colors.primary ?? '#787AF3')
      : (colors.border ?? '#3a3a3a');

  const animatedBorder = useAnimatedStyle(() => ({
    borderWidth: 1.5 + borderProgress.value * 0.5,
  }));

  return (
    <View style={[styles.container, style]} testID={testID}>
      {label && (
        <Text
          style={[
            styles.label,
            {
              color: hasError ? (colors.error ?? '#E37461') : (colors.textSecondary ?? '#aaa'),
              fontFamily: typography.body.fontFamily ?? undefined,
              fontSize: 13,
              marginBottom: spacing.xs ?? 4,
            },
          ]}
        >
          {label}
        </Text>
      )}
      <Animated.View
        style={[
          styles.inputContainer,
          {
            height: sizeConfig.height,
            borderRadius: radii.md ?? 12,
            borderColor,
            backgroundColor: colors.surface ?? '#272727',
            opacity: disabled ? 0.5 : 1,
          },
          animatedBorder,
        ]}
      >
        {leftIcon && <View style={[styles.icon, { marginLeft: sizeConfig.paddingH }]}>{leftIcon}</View>}
        <RNTextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary ?? '#666'}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={!disabled}
          secureTextEntry={secureTextEntry}
          maxLength={maxLength}
          style={[
            styles.input,
            {
              fontSize: sizeConfig.fontSize,
              color: colors.text ?? '#F8FBFC',
              fontFamily: typography.body.fontFamily ?? undefined,
              paddingHorizontal: sizeConfig.paddingH,
            },
            leftIcon && { paddingLeft: 4 },
            rightIcon && { paddingRight: 4 },
          ]}
          accessibilityLabel={label ?? placeholder}
          accessibilityState={{ disabled }}
        />
        {rightIcon && <View style={[styles.icon, { marginRight: sizeConfig.paddingH }]}>{rightIcon}</View>}
      </Animated.View>
      <View style={styles.footer}>
        {(helperText || errorMessage) && (
          <Text
            style={[
              styles.helperText,
              {
                color: hasError ? (colors.error ?? '#E37461') : (colors.textSecondary ?? '#666'),
                fontFamily: typography.body.fontFamily ?? undefined,
              },
            ]}
          >
            {errorMessage || helperText}
          </Text>
        )}
        {showCharCount && maxLength && (
          <Text
            style={[
              styles.charCount,
              { color: colors.textSecondary ?? '#666', fontFamily: typography.body.fontFamily ?? undefined },
            ]}
          >
            {(value?.length ?? 0)}/{maxLength}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    height: '100%',
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  helperText: {
    fontSize: 12,
    flex: 1,
  },
  charCount: {
    fontSize: 12,
    marginLeft: 8,
  },
});
