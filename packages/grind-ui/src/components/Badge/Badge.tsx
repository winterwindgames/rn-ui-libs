import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { BadgeProps } from './Badge.types';

export const Badge: React.FC<BadgeProps> = ({
  value,
  variant = 'solid',
  color,
  size = 'md',
  style,
  testID,
}) => {
  const { colors, spacing } = useTheme();

  const badgeColor = color ?? colors.primary;
  const isSm = size === 'sm';

  if (variant === 'dot') {
    const dotSize = isSm ? 8 : 12;
    return (
      <View
        style={[
          {
            width: dotSize,
            height: dotSize,
            borderRadius: dotSize / 2,
            backgroundColor: badgeColor,
          },
          style,
        ]}
        testID={testID}
        accessibilityRole="none"
        accessibilityLabel="Status indicator"
      />
    );
  }

  const height = isSm ? 18 : 24;
  const fontSize = isSm ? 10 : 12;
  const px = isSm ? spacing.xs : spacing.sm;

  const solidStyle = {
    backgroundColor: badgeColor,
  };

  const outlineStyle = {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: badgeColor,
  };

  const variantStyle = variant === 'outline' ? outlineStyle : solidStyle;
  const textColor = variant === 'outline' ? badgeColor : '#FFFFFF';

  return (
    <View
      style={[
        styles.badge,
        { height, borderRadius: height / 2, paddingHorizontal: px },
        variantStyle,
        style,
      ]}
      testID={testID}
      accessibilityRole="text"
      accessibilityLabel={value != null ? `Badge: ${value}` : 'Badge'}
    >
      {value != null && (
        <Text style={[styles.text, { fontSize, color: textColor }]}>
          {value}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 18,
  },
  text: {
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
