import type { ThemeSpacing } from '../../theme/types';

export type SpacingToken = keyof ThemeSpacing;

export interface SpacerProps {
  size?: SpacingToken | number;
  horizontal?: boolean;
  flex?: number;
  testID?: string;
}
