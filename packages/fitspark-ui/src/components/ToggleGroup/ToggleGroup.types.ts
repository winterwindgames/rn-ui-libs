import type { ViewStyle } from 'react-native';

export interface ToggleGroupItem {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export type ToggleGroupType = 'single' | 'multiple';
export type ToggleGroupSize = 'sm' | 'md' | 'lg';
export type ToggleGroupOrientation = 'horizontal' | 'vertical';

export interface ToggleGroupProps {
  type?: ToggleGroupType;
  value: string | string[];
  onValueChange: (value: string | string[]) => void;
  items: ToggleGroupItem[];
  size?: ToggleGroupSize;
  orientation?: ToggleGroupOrientation;
  style?: ViewStyle;
  testID?: string;
}
