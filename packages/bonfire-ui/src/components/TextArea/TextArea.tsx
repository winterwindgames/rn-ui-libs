import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../Text/Text';
import type { TextAreaProps } from './TextArea.types';

export const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChangeText,
  placeholder,
  label,
  error,
  maxLength,
  numberOfLines = 4,
  disabled = false,
  style,
  inputStyle,
  testID,
}) => {
  const { colors, spacing, radii } = useTheme();

  return (
    <View testID={testID} style={style}>
      {label && <Text variant="label" color={colors.textSecondary} style={{ marginBottom: spacing.xs }}>{label}</Text>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        maxLength={maxLength}
        numberOfLines={numberOfLines}
        multiline
        editable={!disabled}
        textAlignVertical="top"
        accessibilityLabel={label ?? placeholder}
        style={[
          styles.input,
          {
            backgroundColor: colors.inputBackground,
            borderRadius: radii.md,
            borderWidth: 1,
            borderColor: error ? colors.error : colors.border,
            color: colors.text,
            padding: spacing.md,
            minHeight: numberOfLines * 24,
            opacity: disabled ? 0.5 : 1,
            fontSize: 15,
          },
          inputStyle,
        ]}
      />
      {error && <Text variant="caption" color={colors.error} style={{ marginTop: spacing.xs }}>{error}</Text>}
      {maxLength && <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.xs, textAlign: 'right' }}>{value.length}/{maxLength}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {},
});
