import { ViewStyle } from 'react-native';
import { ReactNode } from 'react';

export interface CollapsibleProps {
  expanded: boolean;
  title?: string;
  onToggle?: () => void;
  children: ReactNode;
  style?: ViewStyle;
  testID?: string;
}
