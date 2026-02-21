import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { BreadcrumbProps } from './Breadcrumb.types';

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator,
  style,
  itemStyle,
  activeItemStyle,
  testID = 'breadcrumb',
}) => {
  const { colors, spacing, typography } = useTheme();

  const defaultSeparator = (
    <Text style={[styles.separator, { color: colors.textMuted }]}>/</Text>
  );

  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      style={[styles.container, { paddingHorizontal: spacing.md }, style]}
      accessibilityRole="none"
      testID={testID}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <View key={index} style={styles.row}>
            {item.onPress && !isLast ? (
              <TouchableOpacity
                onPress={item.onPress}
                accessibilityRole="link"
                accessibilityLabel={item.label}
                testID={`${testID}-item-${index}`}
              >
                <Text
                  style={[
                    styles.item,
                    { color: colors.textMuted, ...typography.body },
                    itemStyle,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ) : (
              <Text
                style={[
                  styles.item,
                  {
                    color: isLast ? colors.text : colors.textMuted,
                    ...typography.body,
                    fontWeight: isLast ? '600' : '400',
                  },
                  isLast ? activeItemStyle : itemStyle,
                ]}
                accessibilityRole="text"
                testID={`${testID}-item-${index}`}
              >
                {item.label}
              </Text>
            )}
            {!isLast && (
              <View style={{ marginHorizontal: spacing.xs }}>
                {separator ?? defaultSeparator}
              </View>
            )}
          </View>
        );
      })}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    fontSize: 14,
  },
  separator: {
    fontSize: 14,
  },
});
