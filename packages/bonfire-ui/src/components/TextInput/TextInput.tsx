import React, { useState, useCallback } from 'react';
import { View, TextInput as RNTextInput, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../Text/Text';
import type { TextInputProps } from './TextInput.types';

export const TextInput: React.FC<TextInputProps> = ({
  value,
  onChangeText,
  placeholder,
  label,
  error,
  hint,
  size = 'md',
  leftIcon,
  rightIcon,
  secureTextEntry,
  keyboardType,
  disabled = false,
  autoFocus = false,
  onSubmit,
  style,
  inputStyle,
  testID,
}) => {
  const { colors, spacing, radii, sizes } = useTheme();
  const [focused, setFocused] = useState(false);
  const borderColor = useSharedValue(colors.border);

  const onFocus = useCallback(() => {
    setFocused(true);
    borderColor.value = withTiming(error ? colors.error : colors.primary, { duration: 150 });
  }, [error, colors, borderColor]);

  const onBlur = useCallback(() => {
    setFocused(false);
    borderColor.value = withTiming(error ? colors.error : colors.border, { duration: 150 });
  }, [error, colors, borderColor]);

  const animBorder = useAnimatedStyle(() => ({
    borderColor: borderColor.value,
  }));

  const h = sizes.inputHeight[size];

  return (
    <View testID={testID} style={style}>
      {label && <Text variant="label" color={colors.textSecondary} style={{ marginBottom: spacing.xs }}>{label}</Text>}
      <Animated.View
        style={[
          styles.container,
          {
            height: h,
            backgroundColor: colors.inputBackground,
            borderRadius: radii.md,
            borderWidth: 1,
            paddingHorizontal: spacing.md,
            opacity: disabled ? 0.5 : 1,
          },
          animBorder,
        ]}
      >
        {leftIcon && <View style={{ marginRight: spacing.sm }}>{leftIcon}</View>}
        <RNTextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          editable={!disabled}
          autoFocus={autoFocus}
          onFocus={onFocus}
          onBlur={onBlur}
          onSubmitEditing={onSubmit}
          accessibilityLabel={label ?? placeholder}
          style={[styles.input, { color: colors.text, fontSize: size === 'sm' ? 13 : 15 }, inputStyle]}
        />
        {rightIcon && <View style={{ marginLeft: spacing.sm }}>{rightIcon}</View>}
      </Animated.View>
      {error && <Text variant="caption" color={colors.error} style={{ marginTop: spacing.xs }}>{error}</Text>}
      {!error && hint && <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.xs }}>{hint}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, paddingVertical: 0 },
});
