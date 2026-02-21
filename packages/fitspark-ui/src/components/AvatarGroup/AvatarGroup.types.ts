import { ViewStyle, StyleProp } from 'react-native';
import { AvatarProps } from '../Avatar/Avatar.types';

export interface AvatarGroupProps {
  avatars: AvatarProps[];
  max?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
