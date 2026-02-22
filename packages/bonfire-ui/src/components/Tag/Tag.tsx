import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../Text/Text';
import type { TagProps } from './Tag.types';

export const Tag: React.FC<TagProps> = ({
  label,
  variant = 'soft',
  size = 'md',
  color,
  onRemove,
  icon,
  style,
  testID,
}) => {
  const { colors, spacing, radii } = useTheme();
  const accentColor = color ?? colors.primary;
  const h = size === 'sm' ? 24 : 30;
  const fontSize = size === 'sm' ? 11 : 13;

  const getBg = () => {
    if (variant === 'solid') return accentColor;
    if (variant === 'outline') return 'transparent';
    return accentColor + '20';
  };

  const getTextColor = () => {
    if (variant === 'solid') return colors.textInverse;
    return accentColor;
  };

  return (
    <View
      testID={testID}
      style={[
        styles.tag,
        {
          height: h,
          borderRadius: radii.pill,
          backgroundColor: getBg(),
          paddingHorizontal: spacing.sm,
          borderWidth: variant === 'outline' ? 1 : 0,
          borderColor: accentColor,
        },
        style,
      ]}
    >
      {icon && <View style={{ marginRight: 4 }}>{icon}</View>}
      <Text style={{ color: getTextColor(), fontSize, fontWeight: '600' }}>{label}</Text>
      {onRemove && (
        <Pressable onPress={onRemove} accessibilityRole="button" accessibilityLabel={`Remove ${label}`} hitSlop={4} style={{ marginLeft: 4 }}>
          <Text style={{ color: getTextColor(), fontSize: fontSize - 1 }}>✕</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tag: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' },
});
