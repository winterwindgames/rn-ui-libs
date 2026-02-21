import { ReactNode } from 'react';
import { ViewStyle, StyleProp } from 'react-native';

export interface ListItemProps {
  title: string;
  subtitle?: string;
  leftIcon?: ReactNode;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  rightIcon?: ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  showDivider?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
