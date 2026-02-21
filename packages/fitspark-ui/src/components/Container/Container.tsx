import React from 'react';
import { View, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { ContainerProps } from './Container.types';

export const Container: React.FC<ContainerProps> = ({
  maxWidth = 480,
  px = 'md',
  center = true,
  style,
  testID,
  children,
  ...rest
}) => {
  const { theme } = useTheme();
  const resolvedPx = typeof px === 'number' ? px : theme.spacing[px];

  const containerStyle: ViewStyle = {
    width: '100%',
    maxWidth,
    paddingHorizontal: resolvedPx,
    ...(center && { alignSelf: 'center' }),
  };

  return (
    <View style={[containerStyle, style]} testID={testID} {...rest}>
      {children}
    </View>
  );
};
