import React, { useState, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  useDerivedValue,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { AccordionProps, AccordionSectionProps } from './Accordion.types';

const AccordionSection: React.FC<AccordionSectionProps> = ({ title, children, expanded, onToggle, testID }) => {
  const { colors, spacing } = useTheme();
  const height = useSharedValue(0);
  const opacity = useSharedValue(expanded ? 1 : 0);
  const rotation = useDerivedValue(() => withTiming(expanded ? 90 : 0, { duration: 250 }));

  React.useEffect(() => {
    opacity.value = withTiming(expanded ? 1 : 0, { duration: 250 });
  }, [expanded]);

  const arrowStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={[styles.section, { borderBottomColor: colors.border || '#333333' }]} testID={testID}>
      <Pressable
        onPress={onToggle}
        style={[styles.header, { paddingVertical: spacing?.md || 16, paddingHorizontal: spacing?.md || 16 }]}
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        accessibilityLabel={title}
      >
        <Text style={[styles.title, { color: colors.text || '#FFFFFF' }]}>{title}</Text>
        <Animated.Text style={[styles.arrow, { color: colors.textSecondary || '#8E8E93' }, arrowStyle]}>
          ›
        </Animated.Text>
      </Pressable>
      {expanded && (
        <Animated.View style={[styles.content, { paddingHorizontal: spacing?.md || 16, paddingBottom: spacing?.md || 16 }, contentStyle]}>
          {children}
        </Animated.View>
      )}
    </View>
  );
};

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultExpanded = [],
  style,
  testID,
}) => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(defaultExpanded));

  const toggle = useCallback(
    (id: string) => {
      setExpanded((prev) => {
        const next = new Set(allowMultiple ? prev : []);
        if (prev.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      });
    },
    [allowMultiple],
  );

  return (
    <View style={style} testID={testID}>
      {items.map((item) => (
        <AccordionSection
          key={item.id}
          title={item.title}
          expanded={expanded.has(item.id)}
          onToggle={() => toggle(item.id)}
          testID={testID ? `${testID}-${item.id}` : undefined}
        >
          {item.content}
        </AccordionSection>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    borderBottomWidth: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  arrow: {
    fontSize: 22,
    fontWeight: '300',
  },
  content: {},
});
