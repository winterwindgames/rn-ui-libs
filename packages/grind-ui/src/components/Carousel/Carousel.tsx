import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { Pagination } from '../Pagination';
import type { CarouselProps } from './Carousel.types';

export const Carousel = <T,>({
  data,
  renderItem,
  itemWidth,
  gap = 0,
  showPagination = true,
  style,
  testID,
}: CarouselProps<T>) => {
  const { spacing } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const snapInterval = itemWidth + gap;

  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = e.nativeEvent.contentOffset.x;
      const index = Math.round(offsetX / snapInterval);
      setActiveIndex(Math.min(Math.max(index, 0), data.length - 1));
    },
    [snapInterval, data.length],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      scrollRef.current?.scrollTo({ x: page * snapInterval, animated: true });
      setActiveIndex(page);
    },
    [snapInterval],
  );

  return (
    <View testID={testID} style={style}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}
        snapToInterval={snapInterval}
        decelerationRate="fast"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{
          paddingHorizontal: spacing.md,
          gap,
        }}
      >
        {data.map((item, index) => (
          <View key={index} style={{ width: itemWidth }}>
            {renderItem(item, index)}
          </View>
        ))}
      </ScrollView>

      {showPagination && data.length > 1 && (
        <Pagination
          total={data.length}
          current={activeIndex}
          onPageChange={handlePageChange}
          style={{ marginTop: spacing.sm }}
        />
      )}
    </View>
  );
};
