import React, { useState } from 'react';
import {
  Image as RNImage,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import type { ImageProps } from './Image.types';

const AnimatedImage = Animated.createAnimatedComponent(RNImage);

export const Image: React.FC<ImageProps> = ({
  source,
  fallback,
  aspectRatio,
  borderRadius,
  resizeMode = 'cover',
  loading = false,
  style,
  testID,
}) => {
  const { colors, radii } = useTheme();
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const opacity = useSharedValue(0);

  const animatedImageStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const handleLoad = () => {
    setIsLoading(false);
    opacity.value = withTiming(1, { duration: 300 });
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const radius = borderRadius ?? radii.md;

  if (loading) {
    return (
      <View
        testID={testID}
        style={[
          styles.container,
          {
            aspectRatio,
            borderRadius: radius,
            backgroundColor: colors.surfaceElevated ?? colors.surface,
          },
          style,
        ]}
      >
        <View style={styles.skeleton}>
          <ActivityIndicator color={colors.primary} />
        </View>
      </View>
    );
  }

  if (hasError && fallback) {
    return (
      <View
        testID={testID}
        style={[
          styles.container,
          {
            aspectRatio,
            borderRadius: radius,
            backgroundColor: colors.surfaceElevated ?? colors.surface,
          },
          style,
        ]}
      >
        {fallback}
      </View>
    );
  }

  return (
    <View
      testID={testID}
      style={[
        styles.container,
        {
          aspectRatio,
          borderRadius: radius,
          backgroundColor: colors.surfaceElevated ?? colors.surface,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {isLoading && (
        <View style={[StyleSheet.absoluteFill, styles.skeleton]}>
          <ActivityIndicator color={colors.primary} />
        </View>
      )}
      <AnimatedImage
        source={source as any}
        resizeMode={resizeMode}
        onLoad={handleLoad}
        onError={handleError}
        accessibilityRole="image"
        style={[
          StyleSheet.absoluteFill,
          { borderRadius: radius },
          animatedImageStyle,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
  },
  skeleton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
