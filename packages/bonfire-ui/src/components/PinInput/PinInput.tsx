import React, { useRef } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { PinInputProps } from './PinInput.types';

export const PinInput: React.FC<PinInputProps> = ({
  length = 4, value = '', onChange, secure, autoFocus, style, testID,
}) => {
  const { colors, radii, typography } = useTheme();
  const inputRef = useRef<TextInput>(null);

  return (
    <View testID={testID} style={style}>
      <View style={styles.cells}>
        {Array.from({ length }).map((_, i) => {
          const char = value[i] || '';
          const active = i === value.length;
          return (
            <View key={i} style={[styles.cell, {
              backgroundColor: colors.inputBackground, borderRadius: radii.md,
              borderWidth: 2, borderColor: active ? colors.primary : colors.border,
            }]}>
              <Text style={{ color: colors.text, ...typography.h4 }}>
                {char ? (secure ? '●' : char) : ''}
              </Text>
            </View>
          );
        })}
      </View>
      <TextInput
        ref={inputRef}
        value={value}
        onChangeText={t => onChange?.(t.slice(0, length))}
        maxLength={length}
        keyboardType="number-pad"
        autoFocus={autoFocus}
        style={styles.hiddenInput}
        accessibilityLabel="PIN input"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cells: { flexDirection: 'row', gap: 10, justifyContent: 'center' },
  cell: { width: 48, height: 56, alignItems: 'center', justifyContent: 'center' },
  hiddenInput: { position: 'absolute', opacity: 0, height: 56, width: '100%' },
});
