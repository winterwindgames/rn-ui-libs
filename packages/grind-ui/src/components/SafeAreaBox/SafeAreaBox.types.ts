import type { BoxProps } from '../Box/Box.types';

export type SafeAreaBoxProps = BoxProps & {
  edges?: Array<'top' | 'bottom' | 'left' | 'right'>;
};
