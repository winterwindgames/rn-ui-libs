import React, { useState, useCallback } from 'react';
import {
  View,
  TextInput as RNTextInput,
  Text,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputContentSizeChangeEventData,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { TextAreaProps, TextAreaSize } from './TextArea.types';

const SIZE_CONFIG: Record<TextAreaSize, { fontSize: number; paddingH: number; minHeight: number }> = {
  sm: { fontSize: 13, paddingH: 12, minHeight: 72 },
  md: { fontSize: 15, paddingH: 16, minHeight: 100 },
  lg: { fontSize: 17, paddingH: 16, minHeight: 130 },
};

export const TextArea: React.FC<TextAreaProps> = ({
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
  maxLength,
  showCharCount = false,
  size = 'md',
  numberOfLines = 4,
  autoGrow = false,
  maxHeight = 200,
  style,
  testID,
}) => {
  const { colors, radii, typography, spacing } = useTheme();
  const [focused, setFocused] = useState(false);
  const [height, setHeight] = useState<number | undefined>(undefined);
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

  const handleContentSizeChange = useCallback(
    (e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
      if (autoGrow) {
        const newHeight = Math.min(e.nativeEvent.contentSize.height, maxHeight);
        setHeight(Math.max(newHeight, sizeConfig.minHeight));
      }
    },
    [autoGrow, maxHeight, sizeConfig.minHeight],
  );

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
            minHeight: autoGrow ? sizeConfig.minHeight : undefined,
            height: autoGrow ? height : undefined,
            borderRadius: radii.md ?? 12,
            borderColor,
            backgroundColor: colors.surface ?? '#272727',
            opacity: disabled ? 0.5 : 1,
          },
          animatedBorder,
        ]}
      >
        {leftIcon && <View style={[styles.icon, { marginLeft: sizeConfig.paddingH, marginTop: 12 }]}>{leftIcon}</View>}
        <RNTextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary ?? '#666'}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={!disabled}
          maxLength={maxLength}
          multiline
          numberOfLines={numberOfLines}
          textAlignVertical="top"
          onContentSizeChange={handleContentSizeChange}
          style={[
            styles.input,
            {
              fontSize: sizeConfig.fontSize,
              color: colors.text ?? '#F8FBFC',
              fontFamily: typography.body.fontFamily ?? undefined,
              padding: sizeConfig.paddingH,
              minHeight: sizeConfig.minHeight,
            },
            leftIcon && { paddingLeft: 4 },
            rightIcon && { paddingRight: 4 },
          ]}
          accessibilityLabel={label ?? placeholder}
          accessibilityState={{ disabled }}
        />
        {rightIcon && <View style={[styles.icon, { marginRight: sizeConfig.paddingH, marginTop: 12 }]}>{rightIcon}</View>}
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
    overflow: 'hidden',
  },
  input: {
    flex: 1,
  },
  icon: {
    justifyContent: 'flex-start',
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
