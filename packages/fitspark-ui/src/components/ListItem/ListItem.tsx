import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { ListItemProps } from './ListItem.types';

export const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  left,
  right,
  showChevron = false,
  showDivider = false,
  onPress,
  disabled = false,
  style,
  testID,
}) => {
  const { colors, spacing, typography } = useTheme();

  const content = (
    <>
      <View style={styles.row}>
        {left && <View style={[styles.left, { marginRight: spacing?.md || 12 }]}>{left}</View>}
        <View style={styles.content}>
          <Text
            style={[
              styles.title,
              { color: colors.text || '#FFFFFF', ...(typography?.body || { fontSize: 16 }) },
            ]}
            numberOfLines={1}
          >
            {title}
          </Text>
          {subtitle && (
            <Text
              style={[
                styles.subtitle,
                { color: colors.textSecondary || '#8E8E93', ...(typography?.caption || { fontSize: 13 }) },
              ]}
              numberOfLines={2}
            >
              {subtitle}
            </Text>
          )}
        </View>
        {right && <View style={styles.right}>{right}</View>}
        {showChevron && (
          <Text style={[styles.chevron, { color: colors.textSecondary || '#8E8E93' }]}>›</Text>
        )}
      </View>
      {showDivider && (
        <View
          style={[
            styles.divider,
            {
              backgroundColor: colors.border || '#333333',
              marginLeft: left ? (spacing?.md || 12) + 40 : 0,
            },
          ]}
        />
      )}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        disabled={disabled}
        style={({ pressed }) => [
          styles.container,
          { padding: spacing?.md || 16, backgroundColor: pressed ? (colors.surfaceSecondary || '#2A2A2A') : 'transparent' },
          disabled && styles.disabled,
          style,
        ]}
        testID={testID}
        accessibilityRole="button"
        accessibilityLabel={title}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <View
      style={[styles.container, { padding: spacing?.md || 16 }, disabled && styles.disabled, style]}
      testID={testID}
      accessibilityLabel={title}
    >
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {},
  content: {
    flex: 1,
  },
  right: {
    marginLeft: 8,
  },
  title: {
    fontWeight: '600',
  },
  subtitle: {
    marginTop: 2,
  },
  chevron: {
    fontSize: 22,
    fontWeight: '300',
    marginLeft: 8,
  },
  divider: {
    height: 1,
    marginTop: 16,
  },
  disabled: {
    opacity: 0.5,
  },
});
