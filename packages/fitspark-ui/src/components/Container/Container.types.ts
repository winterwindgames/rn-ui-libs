import type { ViewProps, ViewStyle } from 'react-native';
import type { ThemeSpacing } from '../../theme/types';

export interface ContainerProps extends ViewProps {
  maxWidth?: number;
  px?: keyof ThemeSpacing | number;
  center?: boolean;
  children?: React.ReactNode;
  style?: ViewStyle;
  testID?: string;
}
