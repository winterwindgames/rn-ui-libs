import { ReactNode } from 'react';
import { ViewStyle, StyleProp } from 'react-native';

export interface AccordionItem {
  id: string;
  title: string;
  content: ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultExpanded?: string[];
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export interface AccordionSectionProps {
  title: string;
  children: ReactNode;
  expanded: boolean;
  onToggle: () => void;
  testID?: string;
}
