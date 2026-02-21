import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { ListItemProps } from './ListItem.types';

const ChevronRight: React.FC<{ color: string }> = ({ color }) => (
  <Text style={{ color, fontSize: 18 }}>›</Text>
);

export const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  leftIcon,
  leftElement,
  rightElement,
  rightIcon,
  onPress,
  disabled = false,
  showDivider = false,
  style,
  testID,
}) => {
  const { colors, spacing, typography } = useTheme();

  const defaultRightIcon = onPress && rightIcon === undefined ? (
    <ChevronRight color={colors.textSecondary} />
  ) : rightIcon;

  const content = (
    <View
      style={[
        styles.container,
        { paddingVertical: spacing.md, paddingHorizontal: spacing.md },
        showDivider && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
        disabled && { opacity: 0.4 },
        style,
      ]}
      testID={testID}
      accessibilityRole={onPress ? 'button' : 'text'}
      accessibilityState={{ disabled }}
    >
      {(leftIcon || leftElement) && (
        <View style={[styles.left, { marginRight: spacing.sm }]}>
          {leftElement || leftIcon}
        </View>
      )}
      <View style={styles.content}>
        <Text
          style={[typography.body, { color: colors.text }]}
          numberOfLines={1}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            style={[typography.bodySm, { color: colors.textSecondary, marginTop: 2 }]}
            numberOfLines={2}
          >
            {subtitle}
          </Text>
        )}
      </View>
      {(rightElement || defaultRightIcon) && (
        <View style={[styles.right, { marginLeft: spacing.sm }]}>
          {rightElement || defaultRightIcon}
        </View>
      )}
    </View>
  );

  if (onPress && !disabled) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [pressed && { opacity: 0.7 }]}
      >
        {content}
      </Pressable>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  right: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
