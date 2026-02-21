import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { TagProps } from './Tag.types';

export const Tag: React.FC<TagProps> = ({
  label,
  variant = 'solid',
  color,
  useAccent = false,
  removable = false,
  onRemove,
  onPress,
  disabled = false,
  style,
  testID,
}) => {
  const { colors } = useTheme();
  const tagColor = useAccent ? (colors.accent || '#C8FF00') : (color || colors.textSecondary || '#8E8E93');

  const variantStyles: Record<string, any> = {
    solid: {
      container: { backgroundColor: tagColor },
      text: { color: useAccent ? '#0D0D0D' : '#FFFFFF' },
    },
    outline: {
      container: { backgroundColor: 'transparent', borderWidth: 1, borderColor: tagColor },
      text: { color: tagColor },
    },
    subtle: {
      container: { backgroundColor: tagColor + '20' },
      text: { color: tagColor },
    },
  };

  const vs = variantStyles[variant];

  const content = (
    <View style={[styles.tag, vs.container, disabled && styles.disabled, style]} testID={testID}>
      <Text style={[styles.label, vs.text]} accessibilityLabel={label}>
        {label}
      </Text>
      {removable && (
        <Pressable
          onPress={onRemove}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel={`Remove ${label}`}
          style={styles.removeBtn}
        >
          <Text style={[styles.removeText, vs.text]}>✕</Text>
        </Pressable>
      )}
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} disabled={disabled} accessibilityRole="button">
        {content}
      </Pressable>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
  },
  removeBtn: {
    marginLeft: 6,
  },
  removeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  disabled: {
    opacity: 0.5,
  },
});
