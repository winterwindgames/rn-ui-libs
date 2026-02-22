import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { HeaderProps } from './Header.types';

export const Header: React.FC<HeaderProps> = ({
  title, leftIcon, onLeftPress, rightIcons = [], bg, style, testID,
}) => {
  const { colors, sizes, typography, spacing } = useTheme();
  const bgColor = bg ? ((colors as Record<string, string>)[bg] ?? bg) : colors.background;

  return (
    <View testID={testID} style={[styles.container, { height: sizes.headerHeight, backgroundColor: bgColor, paddingHorizontal: spacing.md }, style]}>
      {leftIcon ? (
        <Pressable onPress={onLeftPress} accessibilityRole="button" accessibilityLabel="Back" style={styles.leftBtn}>
          {leftIcon}
        </Pressable>
      ) : <View style={styles.leftBtn} />}
      <Text style={[styles.title, { color: colors.text, ...typography.h5 }]} numberOfLines={1}>{title}</Text>
      <View style={styles.rightRow}>
        {rightIcons.map((r, i) => (
          <Pressable key={i} onPress={r.onPress} accessibilityRole="button" accessibilityLabel={r.accessibilityLabel} style={styles.rightBtn}>
            {r.icon}
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  leftBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  title: { flex: 1, textAlign: 'center' },
  rightRow: { flexDirection: 'row' },
  rightBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
});
