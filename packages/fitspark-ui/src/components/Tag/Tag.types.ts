import { ViewStyle, StyleProp } from 'react-native';

export type TagVariant = 'solid' | 'outline' | 'subtle';

export interface TagProps {
  label: string;
  variant?: TagVariant;
  color?: string;
  useAccent?: boolean;
  removable?: boolean;
  onRemove?: () => void;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
