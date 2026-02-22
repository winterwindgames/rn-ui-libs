import type { ViewStyle } from 'react-native';
import type { AvatarProps, AvatarSize } from '../Avatar/Avatar.types';

export interface AvatarGroupProps {
  avatars: AvatarProps[];
  max?: number;
  size?: AvatarSize;
  style?: ViewStyle;
  testID?: string;
}
