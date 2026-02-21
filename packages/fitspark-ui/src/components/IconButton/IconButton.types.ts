import type { ViewStyle } from 'react-native';

export type IconButtonVariant = 'solid' | 'outline' | 'ghost';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps {
  icon: React.ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  onPress?: () => void;
  disabled?: boolean;
  accessibilityLabel: string;
  style?: ViewStyle;
  testID?: string;
}
