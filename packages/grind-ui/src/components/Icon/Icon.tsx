import React from 'react';
import { View } from 'react-native';
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
  Feather,
  AntDesign,
  Entypo,
} from '@expo/vector-icons';
import { useTheme } from '../../theme/useTheme';
import type { IconProps, IconFamily } from './Icon.types';

const FAMILY_MAP: Record<IconFamily, React.ComponentType<any>> = {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
  Feather,
  AntDesign,
  Entypo,
};

const SIZE_MAP = { sm: 16, md: 24, lg: 32 };

export const Icon: React.FC<IconProps> = ({
  name,
  family = 'Ionicons',
  size = 'md',
  color,
  style,
  testID,
}) => {
  const { colors } = useTheme();
  const resolvedSize = typeof size === 'number' ? size : SIZE_MAP[size];
  const resolvedColor = color
    ? (colors as any)[color] ?? color
    : colors.text;

  const IconComponent = FAMILY_MAP[family] ?? Ionicons;

  return (
    <View testID={testID} style={style} accessibilityRole="image" accessibilityLabel={name}>
      <IconComponent name={name} size={resolvedSize} color={resolvedColor} />
    </View>
  );
};
