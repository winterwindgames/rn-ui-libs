import { ViewStyle } from 'react-native';

export type IconFamily =
  | 'Ionicons'
  | 'MaterialIcons'
  | 'MaterialCommunityIcons'
  | 'FontAwesome'
  | 'Feather'
  | 'AntDesign';

export interface IconProps {
  name: string;
  family?: IconFamily;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  color?: string;
  style?: ViewStyle;
  testID?: string;
  accessibilityLabel?: string;
}
