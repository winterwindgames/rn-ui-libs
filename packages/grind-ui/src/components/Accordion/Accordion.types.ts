import { ReactNode } from 'react';
import { ViewStyle, StyleProp } from 'react-native';

export interface AccordionItemProps {
  title: string;
  subtitle?: string;
  leftIcon?: ReactNode;
  defaultExpanded?: boolean;
  disabled?: boolean;
  children: ReactNode;
}

export interface AccordionProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
