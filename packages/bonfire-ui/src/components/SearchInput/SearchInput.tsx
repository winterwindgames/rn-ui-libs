import React from 'react';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../Text/Text';
import type { SearchInputProps } from './SearchInput.types';

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChangeText,
  placeholder = 'Search...',
  onClear,
  onSubmit,
  autoFocus = false,
  style,
  testID,
}) => {
  const { colors, spacing, radii, sizes } = useTheme();

  return (
    <View
      testID={testID}
      style={[
        styles.container,
        {
          backgroundColor: colors.inputBackground,
          borderRadius: radii.pill,
          height: sizes.inputHeight.md,
          paddingHorizontal: spacing.md,
        },
        style,
      ]}
    >
      <Text style={{ color: colors.textMuted, marginRight: spacing.sm, fontSize: 16 }}>🔍</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        onSubmitEditing={onSubmit}
        autoFocus={autoFocus}
        returnKeyType="search"
        accessibilityLabel={placeholder}
        style={[styles.input, { color: colors.text, fontSize: 15 }]}
      />
      {value.length > 0 && (
        <Pressable onPress={() => { onChangeText(''); onClear?.(); }} accessibilityRole="button" accessibilityLabel="Clear search" hitSlop={8}>
          <Text style={{ color: colors.textMuted, fontSize: 16 }}>✕</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, paddingVertical: 0 },
});
