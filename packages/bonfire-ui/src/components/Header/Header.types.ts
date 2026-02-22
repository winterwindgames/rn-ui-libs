import type { ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

export interface HeaderRightIcon {
  icon: ReactNode;
  onPress: () => void;
  accessibilityLabel?: string;
}

export interface HeaderProps {
  title?: string;
  leftIcon?: ReactNode;
  onLeftPress?: () => void;
  rightIcons?: HeaderRightIcon[];
  bg?: string;
  style?: ViewStyle;
  testID?: string;
}
