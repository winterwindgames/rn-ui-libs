import { ViewStyle } from 'react-native';

export interface ToggleGroupOption {
  label: string;
  value: string;
}

export interface ToggleGroupProps {
  options: ToggleGroupOption[];
  value: string;
  onChange: (value: string) => void;
  multiple?: boolean;
  style?: ViewStyle;
  testID?: string;
}
