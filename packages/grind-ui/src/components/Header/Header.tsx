import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { HeaderProps } from './Header.types';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight ?? 24;

export const Header: React.FC<HeaderProps> = ({
  title,
  leftIcon,
  onLeftPress,
  rightIcons = [],
  bg,
  style,
  testID,
}) => {
  const { colors, spacing, typography, sizes } = useTheme();

  return (
    <View
      testID={testID}
      accessibilityRole="header"
      style={[
        styles.container,
        {
          backgroundColor: bg ?? colors.surface,
          paddingTop: STATUSBAR_HEIGHT + spacing.sm,
          paddingHorizontal: spacing.md,
          paddingBottom: spacing.sm,
        },
        style,
      ]}
    >
      <View style={styles.row}>
        {/* Left */}
        <View style={[styles.side, { minWidth: 44 }]}>
          {leftIcon && onLeftPress ? (
            <TouchableOpacity
              onPress={onLeftPress}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              accessibilityRole="button"
              accessibilityLabel="Go back"
              style={[
                styles.iconBtn,
                {
                  width: 44,
                  height: 44,
                  borderRadius: 44 / 2,
                },
              ]}
            >
              {leftIcon}
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Title */}
        <Text
          numberOfLines={1}
          style={[
            styles.title,
            {
              color: colors.text,
              fontSize: typography.h4.fontSize,
              fontWeight: typography.h1.fontWeight as any,
              letterSpacing: 1.2,
            },
          ]}
          accessibilityRole="header"
        >
          {title.toUpperCase()}
        </Text>

        {/* Right */}
        <View style={[styles.side, styles.rightSide, { minWidth: 44 }]}>
          {rightIcons.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={item.onPress}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              accessibilityRole="button"
              accessibilityLabel={item.accessibilityLabel ?? `Action ${index + 1}`}
              style={[
                styles.iconBtn,
                {
                  width: 44,
                  height: 44,
                  borderRadius: 44 / 2,
                  marginLeft: spacing.xs,
                },
              ]}
            >
              {item.icon}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
  },
  side: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightSide: {
    justifyContent: 'flex-end',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  iconBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
