import { ReactNode } from 'react';
import { ViewStyle, StyleProp } from 'react-native';

export interface ListItemProps {
  title: string;
  subtitle?: string;
  left?: ReactNode;
  right?: ReactNode;
  showChevron?: boolean;
  showDivider?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
