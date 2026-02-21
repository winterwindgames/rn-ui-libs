import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { StickyHeaderProps } from './StickyHeader.types';

export const StickyHeader: React.FC<StickyHeaderProps> = ({
  header,
  children,
  stickyOffset = 0,
  style,
  headerStyle,
  testID = 'sticky-header',
}) => {
  const { colors, shadows } = useTheme();
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const stickyStyle = useAnimatedStyle(() => {
    const shadowOpacity = interpolate(
      scrollY.value,
      [0, 50],
      [0, 0.3],
      Extrapolation.CLAMP
    );

    return {
      shadowOpacity,
      elevation: scrollY.value > 10 ? 4 : 0,
    };
  });

  return (
    <View style={[styles.container, style]} testID={testID}>
      <Animated.View
        style={[
          styles.header,
          {
            backgroundColor: colors.background,
            top: stickyOffset,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
          },
          headerStyle,
          stickyStyle,
        ]}
      >
        {header}
      </Animated.View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        {children}
      </Animated.ScrollView>
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
  scrollContent: {
    flexGrow: 1,
  },
});
