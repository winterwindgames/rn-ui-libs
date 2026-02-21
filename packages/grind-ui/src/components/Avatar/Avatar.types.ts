import { ImageSourcePropType } from 'react-native';
import { ViewStyle, StyleProp } from 'react-native';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
export type StatusPosition = 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';

export interface AvatarProps {
  source?: ImageSourcePropType;
  name?: string;
  size?: AvatarSize;
  statusColor?: string;
  statusPosition?: StatusPosition;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
