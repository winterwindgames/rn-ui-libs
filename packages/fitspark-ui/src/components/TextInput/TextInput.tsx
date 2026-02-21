import React, { useState, useCallback } from 'react';
import {
  View,
  TextInput as RNTextInput,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../Text';
import type { TextInputProps } from './TextInput.types';

export const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  hint,
  size = 'md',
  leftIcon,
  rightIcon,
  disabled = false,
  containerStyle,
  inputStyle,
  style,
  testID,
  onFocus,
  onBlur,
  ...rest
}) => {
  const { theme } = useTheme();
  const { colors, spacing, radii, sizes } = theme;
  const [focused, setFocused] = useState(false);

  const height = sizes.inputHeight[size];
  const fontSize = size === 'sm' ? 13 : size === 'md' ? 15 : 17;

  const handleFocus = useCallback((e: any) => { setFocused(true); onFocus?.(e); }, [onFocus]);
  const handleBlur = useCallback((e: any) => { setFocused(false); onBlur?.(e); }, [onBlur]);

  const borderColor = error ? colors.error : focused ? colors.primary : colors.border;

  const wrapStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    height,
    backgroundColor: colors.inputBackground,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor,
    paddingHorizontal: spacing.md,
    opacity: disabled ? 0.5 : 1,
  };

  const inputTextStyle: TextStyle = {
    flex: 1,
    fontSize,
    color: colors.text,
    paddingVertical: 0,
    paddingHorizontal: spacing.xs,
  };

  return (
    <View style={[{ gap: spacing.xs }, containerStyle]} testID={testID}>
      {label && <Text variant="label" color="textSecondary">{label}</Text>}
      <View style={[wrapStyle, style]}>
        {leftIcon}
        <RNTextInput
          style={[inputTextStyle, inputStyle]}
          placeholderTextColor={colors.textMuted}
          editable={!disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          accessibilityLabel={label}
          accessibilityState={{ disabled }}
          {...rest}
        />
        {rightIcon}
      </View>
      {error && <Text variant="caption" color="error">{error}</Text>}
      {!error && hint && <Text variant="caption" color="textMuted">{hint}</Text>}
    </View>
  );
};
