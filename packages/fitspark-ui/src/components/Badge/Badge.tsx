import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { BadgeProps, BadgeColor } from './Badge.types';

const COLOR_MAP: Record<BadgeColor, string> = {
  accent: '#C8FF00',
  error: '#FF3B30',
  warning: '#FF9500',
  info: '#007AFF',
  default: '#8E8E93',
};

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'solid',
  color = 'accent',
  children,
  count,
  maxCount = 99,
  visible = true,
  style,
  testID,
}) => {
  const { colors } = useTheme();
  const badgeColor = COLOR_MAP[color] || colors.accent || '#C8FF00';
  const displayText = label ?? (count !== undefined ? (count > maxCount ? `${maxCount}+` : `${count}`) : undefined);

  if (!visible) return children ? <>{children}</> : null;

  const badge = variant === 'dot' ? (
    <View
      style={[styles.dot, { backgroundColor: badgeColor }, style]}
      testID={testID}
      accessibilityLabel="Notification indicator"
    />
  ) : (
    <View
      style={[
        styles.badge,
        variant === 'solid'
          ? { backgroundColor: badgeColor }
          : { backgroundColor: 'transparent', borderWidth: 1, borderColor: badgeColor },
        style,
      ]}
      testID={testID}
      accessibilityLabel={displayText || 'Badge'}
    >
      {displayText && (
        <Text
          style={[
            styles.text,
            {
              color: variant === 'solid'
                ? (color === 'accent' ? '#0D0D0D' : '#FFFFFF')
                : badgeColor,
            },
          ]}
        >
          {displayText}
        </Text>
      )}
    </View>
  );

  if (!children) return badge;

  return (
    <View style={styles.wrapper}>
      {children}
      <View style={styles.badgePosition}>{badge}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    alignSelf: 'flex-start',
  },
  badgePosition: {
    position: 'absolute',
    top: -4,
    right: -4,
  },
  badge: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    paddingHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
  },
});
