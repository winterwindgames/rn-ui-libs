import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { TimelineProps } from './Timeline.types';

export const Timeline: React.FC<TimelineProps> = ({ items, style, testID }) => {
  const { colors, spacing } = useTheme();

  return (
    <View style={style} testID={testID} accessibilityRole="list">
      {items.map((item, i) => {
        const dotColor = item.color || colors.accent || '#C8FF00';
        const isLast = i === items.length - 1;

        return (
          <View key={item.id} style={styles.row} accessibilityLabel={item.title}>
            <View style={styles.lineColumn}>
              <View style={[styles.dot, { backgroundColor: dotColor }]}>
                {item.icon || null}
              </View>
              {!isLast && (
                <View style={[styles.line, { backgroundColor: colors.border || '#333333' }]} />
              )}
            </View>
            <View style={[styles.content, { paddingBottom: spacing?.lg || 24 }]}>
              {item.time && (
                <Text style={[styles.time, { color: colors.textSecondary || '#8E8E93' }]}>
                  {item.time}
                </Text>
              )}
              <Text style={[styles.title, { color: colors.text || '#FFFFFF' }]}>{item.title}</Text>
              {item.description && (
                <Text style={[styles.description, { color: colors.textSecondary || '#8E8E93' }]}>
                  {item.description}
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
  row: {
    flexDirection: 'row',
  },
  lineColumn: {
    width: 32,
    alignItems: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: 2,
    flex: 1,
    marginTop: 4,
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  time: {
    fontSize: 11,
    fontWeight: '500',
    marginBottom: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
  },
  description: {
    fontSize: 13,
    marginTop: 4,
    lineHeight: 18,
  },
});
