import React, { useState } from 'react';
import { View, Image as RNImage } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { ImageProps } from './Image.types';

export const Image: React.FC<ImageProps> = ({
  source, fallback, aspectRatio, borderRadius, width, height, style, testID,
}) => {
  const { colors, radii } = useTheme();
  const [error, setError] = useState(false);

  if (error && fallback) {
    return <View testID={testID} style={[{ width: width as any, height: height as any, borderRadius, backgroundColor: colors.skeleton }, style]}>{fallback}</View>;
  }

  return (
    <RNImage
      testID={testID}
      source={source}
      onError={() => setError(true)}
      style={[{ width: width as any, height: height as any, aspectRatio, borderRadius: borderRadius ?? radii.md }, style]}
    />
  );
};
