import React, { useRef } from 'react';
import {
  View,
  ScrollView,
  Animated as RNAnimated,
  StyleSheet,
  LayoutChangeEvent,
} from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { StickyHeaderProps } from './StickyHeader.types';

export const StickyHeader: React.FC<StickyHeaderProps> = ({
  headerContent,
  children,
  style,
  testID,
}) => {
  const { colors, shadows } = useTheme();
  const scrollY = useRef(new RNAnimated.Value(0)).current;
  const [headerHeight, setHeaderHeight] = React.useState(0);

  const shadowOpacity = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, 0.15],
    extrapolate: 'clamp',
  });

  const onHeaderLayout = (e: LayoutChangeEvent) => {
    setHeaderHeight(e.nativeEvent.layout.height);
  };

  return (
    <View testID={testID} style={[styles.container, style]}>
      {/* Sticky header */}
      <RNAnimated.View
        onLayout={onHeaderLayout}
        style={[
          styles.header,
          {
            backgroundColor: colors.surface,
            shadowOpacity,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            elevation: 4,
            zIndex: 10,
          },
        ]}
      >
        {headerContent}
      </RNAnimated.View>

      {/* Scrollable content */}
      <RNAnimated.ScrollView
        onScroll={RNAnimated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
        style={styles.scroll}
      >
        {children}
      </RNAnimated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  scroll: {
    flex: 1,
  },
});
