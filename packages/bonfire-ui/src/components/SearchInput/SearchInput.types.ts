import { ViewStyle } from 'react-native';

export interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
  onSubmit?: () => void;
  autoFocus?: boolean;
  style?: ViewStyle;
  testID?: string;
}
