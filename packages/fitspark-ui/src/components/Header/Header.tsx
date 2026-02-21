import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { HeaderProps } from './Header.types';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight ?? 0;

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  left,
  onBackPress,
  showBack = true,
  rightActions = [],
  variant = 'solid',
  style,
  titleStyle,
  testID = 'header',
}) => {
  const { colors, spacing, typography } = useTheme();

  const backgroundColor =
    variant === 'transparent' ? 'transparent' : colors.surface;

  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      testID={testID}
      style={[
        styles.container,
        { backgroundColor, paddingTop: STATUSBAR_HEIGHT + spacing.sm },
        style,
      ]}
      accessibilityRole="header"
    >
      <View style={styles.leftSection}>
        {left ??
          (showBack && onBackPress ? (
            <TouchableOpacity
              onPress={onBackPress}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              accessibilityRole="button"
              accessibilityLabel="Go back"
              testID={`${testID}-back`}
              style={[styles.backButton, { borderRadius: 20, backgroundColor: colors.surfaceHighlight }]}
            >
              <Text style={[styles.backArrow, { color: colors.text }]}>‹</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.placeholder} />
          ))}
      </View>

      <View style={styles.centerSection}>
        {title ? (
          <Text
            style={[
              styles.title,
              { color: colors.text, ...typography.heading3 },
              titleStyle,
            ]}
            numberOfLines={1}
            accessibilityRole="header"
          >
            {title}
          </Text>
        ) : null}
        {subtitle ? (
          <Text
            style={[styles.subtitle, { color: colors.textMuted, ...typography.caption }]}
            numberOfLines={1}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>

      <View style={styles.rightSection}>
        {rightActions.map((action, index) => (
          <TouchableOpacity
            key={index}
            onPress={action.onPress}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            accessibilityRole="button"
            accessibilityLabel={action.accessibilityLabel ?? `Action ${index + 1}`}
            testID={action.testID ?? `${testID}-action-${index}`}
            style={[styles.actionButton, { marginLeft: spacing.sm }]}
          >
            {action.icon}
          </TouchableOpacity>
        ))}
        {rightActions.length === 0 && <View style={styles.placeholder} />}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    minHeight: 56,
  },
  leftSection: {
    width: 48,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
  },
  rightSection: {
    minWidth: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 28,
    lineHeight: 32,
    fontWeight: '300',
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    marginTop: 2,
  },
  actionButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholder: {
    width: 36,
    height: 36,
  },
});
