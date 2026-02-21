import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, TextInput, TouchableOpacity, type ViewStyle, type TextStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../Text';
import type { SearchInputProps } from './SearchInput.types';

export const SearchInput: React.FC<SearchInputProps> = ({
  value: controlledValue,
  onChangeText,
  onSearch,
  placeholder = 'Search...',
  debounceMs = 300,
  autoFocus = false,
  disabled = false,
  leftIcon,
  style,
  inputStyle,
  testID,
}) => {
  const { theme } = useTheme();
  const { colors, spacing, radii, sizes } = theme;
  const [internalValue, setInternalValue] = useState(controlledValue ?? '');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = useCallback(
    (text: string) => {
      setInternalValue(text);
      onChangeText?.(text);
      if (onSearch) {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => onSearch(text), debounceMs);
      }
    },
    [onChangeText, onSearch, debounceMs],
  );

  useEffect(() => () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
  }, []);

  const handleClear = useCallback(() => {
    handleChange('');
  }, [handleChange]);

  const containerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    height: sizes.inputHeight.md,
    backgroundColor: colors.inputBackground,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  };

  const textInputStyle: TextStyle = {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    paddingHorizontal: spacing.sm,
    paddingVertical: 0,
  };

  return (
    <View style={[containerStyle, style]} testID={testID}>
      {leftIcon ?? <Text variant="body" color="textMuted">🔍</Text>}
      <TextInput
        style={[textInputStyle, inputStyle]}
        value={value}
        onChangeText={handleChange}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        autoFocus={autoFocus}
        editable={!disabled}
        returnKeyType="search"
        accessibilityRole="search"
        accessibilityLabel={placeholder}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={handleClear} accessibilityLabel="Clear search" accessibilityRole="button">
          <Text variant="body" color="textMuted">✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
