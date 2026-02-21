import React, { useRef, useCallback, useEffect } from 'react';
import {
  View,
  TextInput as RNTextInput,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  cancelAnimation,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { PinInputProps } from './PinInput.types';

export const PinInput: React.FC<PinInputProps> = ({
  length = 4,
  value = '',
  onChange,
  onComplete,
  secureEntry = false,
  error = false,
  autoFocus = false,
  style,
  testID,
}) => {
  const { colors, radii, typography } = useTheme();
  const inputRef = useRef<RNTextInput>(null);
  const cursorOpacity = useSharedValue(1);

  useEffect(() => {
    cursorOpacity.value = withRepeat(
      withSequence(
        withTiming(0, { duration: 500 }),
        withTiming(1, { duration: 500 }),
      ),
      -1,
      false,
    );
    return () => cancelAnimation(cursorOpacity);
  }, [cursorOpacity]);

  const cursorStyle = useAnimatedStyle(() => ({
    opacity: cursorOpacity.value,
  }));

  const handleChange = useCallback(
    (text: string) => {
      const cleaned = text.replace(/[^0-9]/g, '').slice(0, length);
      onChange?.(cleaned);
      if (cleaned.length === length) {
        onComplete?.(cleaned);
      }
    },
    [length, onChange, onComplete],
  );

  const handlePress = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  const borderColor = error ? (colors.error ?? '#E37461') : (colors.border ?? '#3a3a3a');
  const focusBorderColor = error ? (colors.error ?? '#E37461') : (colors.primary ?? '#787AF3');

  return (
    <View testID={testID} style={[styles.container, style]}>
      {/* Hidden input */}
      <RNTextInput
        ref={inputRef}
        value={value}
        onChangeText={handleChange}
        keyboardType="number-pad"
        maxLength={length}
        autoFocus={autoFocus}
        style={styles.hiddenInput}
        accessibilityLabel="PIN input"
      />

      {/* Visual boxes */}
      <Pressable onPress={handlePress} style={styles.boxes}>
        {Array.from({ length }, (_, i) => {
          const char = value[i];
          const isCurrent = i === value.length && value.length < length;
          const isFilled = i < value.length;

          return (
            <View
              key={i}
              style={[
                styles.box,
                {
                  borderRadius: radii.md ?? 12,
                  borderWidth: 2,
                  borderColor: isCurrent ? focusBorderColor : isFilled ? focusBorderColor : borderColor,
                  backgroundColor: colors.surface ?? '#272727',
                },
              ]}
            >
              {char ? (
                <Text
                  style={[
                    styles.digit,
                    {
                      color: colors.text ?? '#F8FBFC',
                      fontFamily: typography.h1.fontFamily ?? undefined,
                    },
                  ]}
                >
                  {secureEntry ? '●' : char}
                </Text>
              ) : isCurrent ? (
                <Animated.View
                  style={[
                    styles.cursor,
                    { backgroundColor: colors.primary ?? '#787AF3' },
                    cursorStyle,
                  ]}
                />
              ) : null}
            </View>
          );
        })}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    height: 0,
    width: 0,
  },
  boxes: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  box: {
    width: 48,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  digit: {
    fontSize: 24,
    fontWeight: '700',
  },
  cursor: {
    width: 2,
    height: 24,
    borderRadius: 1,
  },
});
