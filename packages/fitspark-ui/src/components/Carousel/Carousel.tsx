import React, { useCallback, useRef, useState } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StyleSheet,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { CarouselProps } from './Carousel.types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const Carousel: React.FC<CarouselProps> = ({
  data,
  renderItem,
  itemWidth = SCREEN_WIDTH,
  showPagination = true,
  onIndexChange,
  style,
  testID = 'carousel',
}) => {
  const { colors, spacing } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round(offsetX / itemWidth);
      if (index !== activeIndex && index >= 0 && index < data.length) {
        setActiveIndex(index);
        onIndexChange?.(index);
      }
    },
    [activeIndex, itemWidth, data.length, onIndexChange]
  );

  return (
    <View style={[styles.container, style]} testID={testID}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={itemWidth}
        snapToAlignment="center"
        accessibilityRole="adjustable"
      >
        {data.map((item, index) => (
          <View key={index} style={{ width: itemWidth }}>
            {renderItem(item, index)}
          </View>
        ))}
      </ScrollView>

      {showPagination && data.length > 1 && (
        <View style={[styles.dots, { marginTop: spacing.sm }]}>
          {data.map((_, i) => (
            <PaginationDot
              key={i}
              active={i === activeIndex}
              accentColor={colors.accent}
              mutedColor={colors.textMuted}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const PaginationDot: React.FC<{
  active: boolean;
  accentColor: string;
  mutedColor: string;
}> = ({ active, accentColor, mutedColor }) => {
  const animStyle = useAnimatedStyle(() => ({
    width: withSpring(active ? 20 : 6),
    opacity: withSpring(active ? 1 : 0.4),
    backgroundColor: active ? accentColor : mutedColor,
  }));

  return <Animated.View style={[styles.dot, animStyle]} />;
};

const styles = StyleSheet.create({
  container: {},
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
  },
});
