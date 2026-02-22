import type { ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

export interface ListItemProps {
  title: string;
  subtitle?: string;
  leftIcon?: ReactNode;
  leftElement?: ReactNode;
  rightAccessory?: ReactNode;
  showChevron?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  testID?: string;
}
