import { ViewStyle, StyleProp, ImageSourcePropType } from 'react-native';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
export type AvatarStatus = 'active' | 'inactive' | 'away' | 'none';

export interface AvatarProps {
  source?: ImageSourcePropType;
  uri?: string;
  name?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
