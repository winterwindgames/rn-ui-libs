import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { KeyValueProps } from './KeyValue.types';

export const KeyValue: React.FC<KeyValueProps> = ({
  label, value, orientation = 'horizontal', style, testID,
}) => {
  const { colors, typography, spacing } = useTheme();
  const isH = orientation === 'horizontal';

  return (
    <View testID={testID} style={[{ flexDirection: isH ? 'row' : 'column', justifyContent: isH ? 'space-between' : undefined, paddingVertical: spacing.xs }, style]}>
      <Text style={{ color: colors.textSecondary, ...typography.bodySm }}>{label}</Text>
      {typeof value === 'string' ? (
        <Text style={{ color: colors.text, ...typography.body, fontWeight: '500', marginTop: isH ? 0 : 2 }}>{value}</Text>
      ) : value}
    </View>
  );
};
