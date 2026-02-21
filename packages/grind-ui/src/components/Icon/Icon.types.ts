import { ViewStyle } from 'react-native';

export type IconFamily =
  | 'Ionicons'
  | 'MaterialIcons'
  | 'MaterialCommunityIcons'
  | 'FontAwesome'
  | 'FontAwesome5'
  | 'Feather'
  | 'AntDesign'
  | 'Entypo';

export interface IconProps {
  name: string;
  family?: IconFamily;
  size?: 'sm' | 'md' | 'lg' | number;
  color?: string;
  style?: ViewStyle;
  testID?: string;
}
