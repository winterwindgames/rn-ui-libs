import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  TextInput as RNTextInput,
  Text,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { SearchInputProps } from './SearchInput.types';

export const SearchInput: React.FC<SearchInputProps> = ({
  value: controlledValue,
  onChangeText,
  onSubmit,
  placeholder = 'Search…',
  debounceMs = 300,
  loading = false,
  clearable = true,
  style,
  testID,
}) => {
  const { colors, radii, typography } = useTheme();
  const [focused, setFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(controlledValue ?? '');
  const borderProgress = useSharedValue(0);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const displayValue = controlledValue ?? internalValue;

  useEffect(() => {
    if (controlledValue !== undefined) {
      setInternalValue(controlledValue);
    }
  }, [controlledValue]);

  const handleChange = useCallback(
    (text: string) => {
      setInternalValue(text);
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        onChangeText?.(text);
      }, debounceMs);
    },
    [onChangeText, debounceMs],
  );

  const handleClear = useCallback(() => {
    setInternalValue('');
    onChangeText?.('');
  }, [onChangeText]);

  const handleFocus = useCallback(() => {
    setFocused(true);
    borderProgress.value = withTiming(1, { duration: 200 });
  }, [borderProgress]);

  const handleBlur = useCallback(() => {
    setFocused(false);
    borderProgress.value = withTiming(0, { duration: 200 });
  }, [borderProgress]);

  const animatedBorder = useAnimatedStyle(() => ({
    borderWidth: 1.5 + borderProgress.value * 0.5,
  }));

  const borderColor = focused ? (colors.primary ?? '#787AF3') : (colors.border ?? '#3a3a3a');

  return (
    <Animated.View
      testID={testID}
      style={[
        styles.container,
        {
          borderRadius: radii.pill ?? 100,
          borderColor,
          backgroundColor: colors.surface ?? '#272727',
        },
        animatedBorder,
        style,
      ]}
    >
      {/* Search icon */}
      <Text style={[styles.searchIcon, { color: colors.textSecondary ?? '#666' }]}>⌕</Text>

      <RNTextInput
        value={displayValue}
        onChangeText={handleChange}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary ?? '#666'}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onSubmitEditing={() => onSubmit?.(displayValue)}
        returnKeyType="search"
        style={[
          styles.input,
          {
            color: colors.text ?? '#F8FBFC',
            fontFamily: typography.body.fontFamily ?? undefined,
            fontSize: 15,
          },
        ]}
        accessibilityLabel={placeholder}
        accessibilityRole="search"
      />

      {loading && (
        <ActivityIndicator
          size="small"
          color={colors.primary ?? '#787AF3'}
          style={styles.loader}
        />
      )}

      {clearable && displayValue.length > 0 && !loading && (
        <Pressable
          onPress={handleClear}
          style={styles.clearButton}
          accessibilityLabel="Clear search"
          accessibilityRole="button"
        >
          <Text style={[styles.clearIcon, { color: colors.textSecondary ?? '#666' }]}>✕</Text>
        </Pressable>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    paddingHorizontal: 16,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: '100%',
  },
  loader: {
    marginLeft: 8,
  },
  clearButton: {
    marginLeft: 8,
    padding: 4,
  },
  clearIcon: {
    fontSize: 14,
    fontWeight: '700',
  },
});
