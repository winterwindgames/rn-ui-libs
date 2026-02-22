import React, { useState, useRef } from 'react';
import { View, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { CarouselProps } from './Carousel.types';

const { width: SCREEN_W } = Dimensions.get('window');

export const Carousel: React.FC<CarouselProps> = ({
  data, renderItem, showPagination = true, style, testID,
}) => {
  const { colors } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (e: any) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / (SCREEN_W - 48));
    setActiveIndex(idx);
  };

  return (
    <View testID={testID} style={style}>
      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false} onScroll={handleScroll} scrollEventThrottle={16}>
        {data.map((item, i) => (
          <View key={i} style={{ width: SCREEN_W - 48 }}>{renderItem(item, i)}</View>
        ))}
      </ScrollView>
      {showPagination && (
        <View style={styles.pagination}>
          {data.map((_, i) => (
            <View key={i} style={[styles.dot, { backgroundColor: i === activeIndex ? colors.primary : colors.border, width: i === activeIndex ? 20 : 8 }]} />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 12 },
  dot: { height: 8, borderRadius: 4 },
});
