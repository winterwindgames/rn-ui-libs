import { ImageSourcePropType, ViewStyle, StyleProp } from 'react-native';
import { AvatarSize } from '../Avatar/Avatar.types';

export interface AvatarGroupItem {
  source?: ImageSourcePropType;
  name: string;
}

export interface AvatarGroupProps {
  avatars: AvatarGroupItem[];
  max?: number;
  size?: AvatarSize;
  spacing?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
