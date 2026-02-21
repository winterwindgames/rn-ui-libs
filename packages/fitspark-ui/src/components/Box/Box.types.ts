import type { ViewProps, ViewStyle } from 'react-native';
import type { ThemeSpacing, ThemeRadii, ThemeShadows, ThemeColors } from '../../theme/types';

export type SpacingToken = keyof ThemeSpacing;
export type RadiusToken = keyof ThemeRadii;
export type ShadowToken = keyof ThemeShadows;
export type ColorToken = keyof ThemeColors;

export interface BoxProps extends ViewProps {
  p?: SpacingToken | number;
  px?: SpacingToken | number;
  py?: SpacingToken | number;
  pt?: SpacingToken | number;
  pb?: SpacingToken | number;
  pl?: SpacingToken | number;
  pr?: SpacingToken | number;
  m?: SpacingToken | number;
  mx?: SpacingToken | number;
  my?: SpacingToken | number;
  mt?: SpacingToken | number;
  mb?: SpacingToken | number;
  ml?: SpacingToken | number;
  mr?: SpacingToken | number;
  bg?: ColorToken | string;
  radius?: RadiusToken | number;
  shadow?: ShadowToken;
  border?: boolean;
  borderColor?: ColorToken | string;
  borderWidth?: number;
  flex?: number;
  row?: boolean;
  center?: boolean;
  align?: ViewStyle['alignItems'];
  justify?: ViewStyle['justifyContent'];
  wrap?: boolean;
  width?: ViewStyle['width'];
  height?: ViewStyle['height'];
  minHeight?: ViewStyle['minHeight'];
  maxWidth?: ViewStyle['maxWidth'];
  overflow?: ViewStyle['overflow'];
  opacity?: number;
  position?: ViewStyle['position'];
  gap?: SpacingToken | number;
  children?: React.ReactNode;
  style?: ViewStyle;
  testID?: string;
}
