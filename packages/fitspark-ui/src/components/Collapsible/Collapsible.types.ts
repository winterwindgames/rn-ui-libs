import { ReactNode } from 'react';
import { ViewStyle } from 'react-native';

export interface CollapsibleProps {
  title: string;
  children: ReactNode;
  initiallyExpanded?: boolean;
  onToggle?: (expanded: boolean) => void;
  style?: ViewStyle;
  headerStyle?: ViewStyle;
  testID?: string;
}
