import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { KeyValueProps } from './KeyValue.types';

export const KeyValue: React.FC<KeyValueProps> = ({
  label,
  value,
  direction = 'horizontal',
  labelWidth,
  style,
  testID,
}) => {
  const { colors, spacing, typography } = useTheme();

  const isHorizontal = direction === 'horizontal';

  return (
    <View
      style={[
        isHorizontal ? styles.horizontal : styles.vertical,
        { paddingVertical: spacing.xs },
        style,
      ]}
      testID={testID}
      accessibilityRole="text"
      accessibilityLabel={`${label}: ${typeof value === 'string' ? value : ''}`}
    >
      <Text
        style={[
          typography.bodySm,
          {
            color: colors.textSecondary,
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: 0.5,
            fontSize: 11,
          },
          isHorizontal && { width: labelWidth ?? 120 },
          !isHorizontal && { marginBottom: 4 },
        ]}
        numberOfLines={1}
      >
        {label}
      </Text>
      {typeof value === 'string' ? (
        <Text
          style={[
            typography.body,
            {
              color: colors.text,
              flex: isHorizontal ? 1 : undefined,
            },
          ]}
        >
          {value}
        </Text>
      ) : (
        <View style={isHorizontal ? { flex: 1 } : undefined}>{value}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vertical: {
    flexDirection: 'column',
  },
});
