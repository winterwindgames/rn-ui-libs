import type { ViewProps, ViewStyle } from 'react-native';
import type { ThemeSpacing } from '../../theme/types';

export type SpacingToken = keyof ThemeSpacing;

export interface StackProps extends ViewProps {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  gap?: SpacingToken | number;
  align?: ViewStyle['alignItems'];
  justify?: ViewStyle['justifyContent'];
  wrap?: boolean;
  flex?: number;
  children?: React.ReactNode;
  style?: ViewStyle;
  testID?: string;
}

export interface HStackProps extends Omit<StackProps, 'direction'> {}
export interface VStackProps extends Omit<StackProps, 'direction'> {}
