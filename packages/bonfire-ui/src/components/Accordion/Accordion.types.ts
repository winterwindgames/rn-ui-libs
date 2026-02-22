import type { ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

export interface AccordionProps {
  children?: ReactNode;
  style?: ViewStyle;
  testID?: string;
}

export interface AccordionItemProps {
  title: string;
  expanded?: boolean;
  onToggle?: () => void;
  icon?: ReactNode;
  children?: ReactNode;
  style?: ViewStyle;
  testID?: string;
}
