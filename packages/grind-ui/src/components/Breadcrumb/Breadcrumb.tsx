import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { BreadcrumbProps } from './Breadcrumb.types';

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = '/',
  style,
  testID,
}) => {
  const { colors, spacing, typography } = useTheme();

  return (
    <View
      testID={testID}
      accessibilityRole="navigation"
      accessibilityLabel="Breadcrumb"
      style={[styles.container, { paddingVertical: spacing.sm }, style]}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            {item.onPress && !isLast ? (
              <TouchableOpacity
                onPress={item.onPress}
                accessibilityRole="link"
                accessibilityLabel={item.label}
              >
                <Text
                  style={[
                    styles.label,
                    {
                      color: colors.primary,
                      fontSize: typography.bodySm.fontSize,
                      fontWeight: typography.body.fontWeight as any,
                    },
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ) : (
              <Text
                style={[
                  styles.label,
                  {
                    color: isLast ? colors.text : colors.textSecondary,
                    fontSize: typography.bodySm.fontSize,
                    fontWeight: isLast
                      ? (typography.h1.fontWeight as any)
                      : (typography.body.fontWeight as any),
                  },
                ]}
                accessibilityLabel={isLast ? `Current page: ${item.label}` : item.label}
              >
                {item.label}
              </Text>
            )}
            {!isLast && (
              <Text
                style={[
                  styles.separator,
                  {
                    color: colors.textSecondary,
                    fontSize: typography.bodySm.fontSize,
                    marginHorizontal: spacing.xs,
                  },
                ]}
                accessibilityLabel=""
                importantForAccessibility="no"
              >
                {typeof separator === 'string' ? separator : null}
              </Text>
            )}
            {!isLast && typeof separator !== 'string' ? (
              <View style={{ marginHorizontal: spacing.xs }}>{separator}</View>
            ) : null}
          </React.Fragment>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  label: {},
  separator: {},
});
