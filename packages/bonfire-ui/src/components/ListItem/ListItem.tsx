import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { ListItemProps } from './ListItem.types';

export const ListItem: React.FC<ListItemProps> = ({
  title, subtitle, leftIcon, leftElement, rightAccessory, showChevron, onPress, style, testID,
}) => {
  const { colors, spacing, typography } = useTheme();
  const Wrapper = onPress ? Pressable : View;

  return (
    <Wrapper testID={testID} onPress={onPress} accessibilityRole={onPress ? 'button' : undefined}
      style={[styles.container, { paddingVertical: spacing.sm + 4, paddingHorizontal: spacing.md }, style]}>
      {(leftIcon || leftElement) && <View style={styles.left}>{leftIcon || leftElement}</View>}
      <View style={styles.content}>
        <Text style={{ color: colors.text, ...typography.body, fontWeight: '500' }}>{title}</Text>
        {subtitle && <Text style={{ color: colors.textSecondary, ...typography.bodySm, marginTop: 2 }}>{subtitle}</Text>}
      </View>
      {rightAccessory && <View style={styles.right}>{rightAccessory}</View>}
      {showChevron && <Text style={{ color: colors.textMuted, fontSize: 16, marginLeft: 8 }}>›</Text>}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  left: { marginRight: 12 },
  content: { flex: 1 },
  right: { marginLeft: 8 },
});
