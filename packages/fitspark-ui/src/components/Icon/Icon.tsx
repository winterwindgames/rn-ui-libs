import React from 'react';
import { View } from 'react-native';
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
  Feather,
  AntDesign,
} from '@expo/vector-icons';
import { useTheme } from '../../theme/useTheme';
import { IconProps, IconFamily } from './Icon.types';

const ICON_COMPONENTS: Record<IconFamily, any> = {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
  Feather,
  AntDesign,
};

const SIZE_MAP: Record<string, number> = {
  xs: 14,
  sm: 18,
  md: 24,
  lg: 32,
  xl: 40,
};

export const Icon: React.FC<IconProps> = ({
  name,
  family = 'Ionicons',
  size = 'md',
  color,
  style,
  testID = 'icon',
  accessibilityLabel,
}) => {
  const { colors, sizes } = useTheme();

  const resolvedSize = typeof size === 'number' ? size : SIZE_MAP[size] ?? 24;
  const resolvedColor = color ?? colors.text;
  const IconComponent = ICON_COMPONENTS[family] ?? Ionicons;

  return (
    <View
      style={style}
      testID={testID}
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel ?? name}
    >
      <IconComponent name={name} size={resolvedSize} color={resolvedColor} />
    </View>
  );
};
