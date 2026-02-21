import { ReactNode } from 'react';
import { ViewStyle, TextStyle } from 'react-native';

export interface HeaderAction {
  icon: ReactNode;
  onPress: () => void;
  accessibilityLabel?: string;
  testID?: string;
}

export interface HeaderProps {
  title?: string;
  subtitle?: string;
  left?: ReactNode;
  onBackPress?: () => void;
  showBack?: boolean;
  rightActions?: HeaderAction[];
  variant?: 'solid' | 'transparent';
  style?: ViewStyle;
  titleStyle?: TextStyle;
  testID?: string;
}
