import type { ViewStyle, ImageSourcePropType } from 'react-native';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';

export interface AvatarProps {
  source?: ImageSourcePropType;
  uri?: string;
  name?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  style?: ViewStyle;
  testID?: string;
}
