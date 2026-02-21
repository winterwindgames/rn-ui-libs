import React, { useRef, useCallback } from 'react';
import { View, TextInput, TouchableOpacity, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, withSequence, withTiming } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../Text';
import type { PinInputProps } from './PinInput.types';

export const PinInput: React.FC<PinInputProps> = ({
  length = 6,
  value = '',
  onChangeText,
  onComplete,
  secure = false,
  error = false,
  disabled = false,
  autoFocus = true,
  style,
  testID,
}) => {
  const { theme } = useTheme();
  const { colors, spacing, radii } = theme;
  const inputRef = useRef<TextInput>(null);

  const handleChange = useCallback(
    (text: string) => {
      const cleaned = text.replace(/[^0-9]/g, '').slice(0, length);
      onChangeText?.(cleaned);
      if (cleaned.length === length) {
        onComplete?.(cleaned);
      }
    },
    [length, onChangeText, onComplete],
  );

  const digits = value.split('');

  const boxSize = 48;

  const cellStyle = (idx: number): ViewStyle => ({
    width: boxSize,
    height: boxSize + 8,
    borderRadius: radii.md,
    borderWidth: 2,
    borderColor: error
      ? colors.error
      : idx === digits.length
        ? colors.primary
        : idx < digits.length
          ? colors.primary
          : colors.border,
    backgroundColor: colors.inputBackground,
    alignItems: 'center',
    justifyContent: 'center',
  });

  return (
    <View style={style} testID={testID}>
      <TouchableOpacity
        onPress={() => inputRef.current?.focus()}
        style={{ flexDirection: 'row', gap: spacing.sm, justifyContent: 'center' }}
        activeOpacity={1}
        accessibilityRole="none"
      >
        {Array.from({ length }, (_, i) => (
          <View key={i} style={cellStyle(i)}>
            <Text variant="h4" color={error ? 'error' : 'text'}>
              {digits[i] ? (secure ? '●' : digits[i]) : ''}
            </Text>
          </View>
        ))}
      </TouchableOpacity>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={handleChange}
        keyboardType="number-pad"
        maxLength={length}
        autoFocus={autoFocus}
        editable={!disabled}
        style={{ position: 'absolute', opacity: 0, height: 0, width: 0 }}
        accessibilityLabel="PIN input"
        textContentType="oneTimeCode"
      />
    </View>
  );
};
