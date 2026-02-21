import React, { useState, useCallback } from 'react';
import {
  View,
  Image as RNImage,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  FadeIn,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { ImageProps } from './Image.types';

const Skeleton: React.FC<{ style?: any }> = ({ style }) => {
  const { colors } = useTheme();
  const opacity = useSharedValue(0.3);

  React.useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.7, { duration: 800 }),
        withTiming(0.3, { duration: 800 })
      ),
      -1,
      true
    );
  }, [opacity]);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        { backgroundColor: colors.surfaceHighlight },
        animStyle,
        style,
      ]}
    />
  );
};

export const Image: React.FC<ImageProps> = ({
  source,
  aspectRatio,
  width,
  height,
  borderRadius,
  fallback,
  showSkeleton = true,
  resizeMode = 'cover',
  style,
  testID = 'image',
  accessibilityLabel,
}) => {
  const { colors, radii } = useTheme();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = useCallback(() => setLoading(false), []);
  const handleError = useCallback(() => {
    setLoading(false);
    setError(true);
  }, []);

  const radius = borderRadius ?? radii.md;

  const containerStyle = {
    width: width as any,
    height: height as any,
    aspectRatio,
    borderRadius: radius,
    overflow: 'hidden' as const,
    backgroundColor: colors.surfaceHighlight,
  };

  if (error) {
    return (
      <View style={[containerStyle, styles.fallbackContainer, style]} testID={testID}>
        {fallback ?? (
          <View style={styles.errorFallback}>
            <Text style={{ color: colors.textMuted, fontSize: 24 }}>⚠</Text>
            <Text style={{ color: colors.textMuted, fontSize: 12, marginTop: 4 }}>
              Failed to load
            </Text>
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={[containerStyle, style]} testID={testID}>
      {loading && showSkeleton && <Skeleton />}
      <Animated.View entering={FadeIn.duration(200)} style={StyleSheet.absoluteFill}>
        <RNImage
          source={source as any}
          resizeMode={resizeMode}
          onLoad={handleLoad}
          onError={handleError}
          style={[StyleSheet.absoluteFill, { borderRadius: radius }]}
          accessibilityRole="image"
          accessibilityLabel={accessibilityLabel}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  fallbackContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorFallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
