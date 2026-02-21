import React, { useState, useCallback } from 'react';
import { View, TextInput as RNTextInput, type ViewStyle, type TextStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../Text';
import type { TextAreaProps } from './TextArea.types';

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  minHeight = 100,
  maxHeight = 200,
  autoGrow = true,
  disabled = false,
  containerStyle,
  inputStyle,
  style,
  testID,
  onFocus,
  onBlur,
  onContentSizeChange,
  ...rest
}) => {
  const { theme } = useTheme();
  const { colors, spacing, radii } = theme;
  const [focused, setFocused] = useState(false);
  const [height, setHeight] = useState(minHeight);

  const handleFocus = useCallback((e: any) => { setFocused(true); onFocus?.(e); }, [onFocus]);
  const handleBlur = useCallback((e: any) => { setFocused(false); onBlur?.(e); }, [onBlur]);

  const handleContentSize = useCallback(
    (e: any) => {
      if (autoGrow) {
        const h = e.nativeEvent.contentSize.height;
        setHeight(Math.min(Math.max(h, minHeight), maxHeight));
      }
      onContentSizeChange?.(e);
    },
    [autoGrow, minHeight, maxHeight, onContentSizeChange],
  );

  const borderColor = error ? colors.error : focused ? colors.primary : colors.border;

  const wrapStyle: ViewStyle = {
    backgroundColor: colors.inputBackground,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor,
    padding: spacing.md,
    opacity: disabled ? 0.5 : 1,
  };

  const textStyle: TextStyle = {
    fontSize: 15,
    color: colors.text,
    height: autoGrow ? height : minHeight,
    textAlignVertical: 'top',
    padding: 0,
  };

  return (
    <View style={[{ gap: spacing.xs }, containerStyle]} testID={testID}>
      {label && <Text variant="label" color="textSecondary">{label}</Text>}
      <View style={[wrapStyle, style]}>
        <RNTextInput
          multiline
          style={[textStyle, inputStyle]}
          placeholderTextColor={colors.textMuted}
          editable={!disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onContentSizeChange={handleContentSize}
          accessibilityLabel={label}
          accessibilityState={{ disabled }}
          {...rest}
        />
      </View>
      {error && <Text variant="caption" color="error">{error}</Text>}
    </View>
  );
};
