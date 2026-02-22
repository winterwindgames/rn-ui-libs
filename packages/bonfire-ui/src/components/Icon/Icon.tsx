import React from 'react';
import { Text } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { IconProps } from './Icon.types';

const SIZE_MAP: Record<string, number> = { xs: 12, sm: 16, md: 20, lg: 24, xl: 32 };

export const Icon: React.FC<IconProps> = ({ name, size = 'md', color = 'text', style, testID }) => {
  const { colors } = useTheme();
  const resolvedSize = typeof size === 'number' ? size : (SIZE_MAP[size] ?? 20);
  const resolvedColor = (colors as Record<string, string>)[color] ?? color;

  return <Text testID={testID} style={[{ fontSize: resolvedSize, color: resolvedColor }, style]}>{name}</Text>;
};
