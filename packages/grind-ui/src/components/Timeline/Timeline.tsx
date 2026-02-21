import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { TimelineProps } from './Timeline.types';

const DOT_SIZE = 12;
const LINE_WIDTH = 2;

export const Timeline: React.FC<TimelineProps> = ({
  items,
  lineColor,
  style,
  testID,
}) => {
  const { colors, spacing, typography } = useTheme();

  const line = lineColor ?? colors.border;

  return (
    <View style={[styles.container, style]} testID={testID} accessibilityRole="list">
      {items.map((item, index) => {
        const dotColor = item.color ?? colors.primary;
        const isLast = index === items.length - 1;

        return (
          <View key={index} style={styles.row} accessibilityRole="listitem">
            {/* Dot + Line column */}
            <View style={styles.indicator}>
              {item.icon ? (
                <View style={[styles.iconWrap, { backgroundColor: dotColor, borderRadius: 12, width: 24, height: 24 }]}>
                  {item.icon}
                </View>
              ) : (
                <View
                  style={[
                    styles.dot,
                    {
                      width: DOT_SIZE,
                      height: DOT_SIZE,
                      borderRadius: DOT_SIZE / 2,
                      backgroundColor: dotColor,
                    },
                  ]}
                />
              )}
              {!isLast && (
                <View
                  style={[
                    styles.line,
                    {
                      backgroundColor: line,
                      width: LINE_WIDTH,
                    },
                  ]}
                />
              )}
            </View>

            {/* Content */}
            <View style={[styles.content, { paddingBottom: isLast ? 0 : spacing.lg, marginLeft: spacing.md }]}>
              <View style={styles.titleRow}>
                <Text style={[typography.body, { color: colors.text, fontWeight: '600', flex: 1 }]}>
                  {item.title}
                </Text>
                {item.time && (
                  <Text style={[typography.bodySm, { color: colors.textSecondary }]}>
                    {item.time}
                  </Text>
                )}
              </View>
              {item.subtitle && (
                <Text style={[typography.bodySm, { color: colors.textSecondary, marginTop: 4 }]}>
                  {item.subtitle}
                </Text>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  row: {
    flexDirection: 'row',
  },
  indicator: {
    alignItems: 'center',
    width: 24,
  },
  dot: {},
  iconWrap: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    flex: 1,
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
