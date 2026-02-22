import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { PaginationProps } from './Pagination.types';

export const Pagination: React.FC<PaginationProps> = ({
  total, current = 0, onPageChange, variant = 'dots', style, testID,
}) => {
  const { colors, radii } = useTheme();

  if (variant === 'dots') {
    return (
      <View testID={testID} style={[styles.container, style]}>
        {Array.from({ length: total }).map((_, i) => (
          <Pressable key={i} onPress={() => onPageChange?.(i)}>
            <View style={[styles.dot, { backgroundColor: i === current ? colors.primary : colors.border, width: i === current ? 20 : 8 }]} />
          </Pressable>
        ))}
      </View>
    );
  }

  return (
    <View testID={testID} style={[styles.container, style]}>
      {Array.from({ length: total }).map((_, i) => (
        <Pressable key={i} onPress={() => onPageChange?.(i)}
          style={[styles.numBtn, { backgroundColor: i === current ? colors.primary : 'transparent', borderRadius: radii.sm }]}>
          <Text style={{ color: i === current ? colors.textInverse : colors.text, fontWeight: '600' }}>{i + 1}</Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  dot: { height: 8, borderRadius: 4 },
  numBtn: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
});
