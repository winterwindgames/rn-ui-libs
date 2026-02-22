import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { SpinnerProps, SpinnerSize } from './Spinner.types';

const SIZE_MAP: Record<SpinnerSize, 'small' | 'large'> = { sm: 'small', md: 'small', lg: 'large' };

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color,
  style,
  testID,
}) => {
  const { colors } = useTheme();

  return (
    <ActivityIndicator
      testID={testID}
      size={SIZE_MAP[size]}
      color={color ?? colors.primary}
      style={style}
      accessibilityLabel="Loading"
    />
  );
};
