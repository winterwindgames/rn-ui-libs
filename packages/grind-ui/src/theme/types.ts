import type { TextStyle } from 'react-native';

export type ColorScheme = 'light' | 'dark' | 'system';

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceElevated: string;
  primary: string;
  primaryLight: string;
  secondary: string;
  secondaryLight: string;
  accent: string;
  sage: string;
  text: string;
  textSecondary: string;
  textInverse: string;
  border: string;
  error: string;
  success: string;
  warning: string;
  info: string;
  overlay: string;
}

export interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export interface ThemeRadii {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  pill: number;
  full: number;
}

export interface TypographyVariant {
  fontFamily: string;
  fontSize: number;
  fontWeight: TextStyle['fontWeight'];
  lineHeight: number;
  letterSpacing?: number;
  textTransform?: TextStyle['textTransform'];
}

export interface ThemeTypography {
  h1: TypographyVariant;
  h2: TypographyVariant;
  h3: TypographyVariant;
  h4: TypographyVariant;
  h5: TypographyVariant;
  h6: TypographyVariant;
  bodyLg: TypographyVariant;
  body: TypographyVariant;
  bodySm: TypographyVariant;
  caption: TypographyVariant;
  label: TypographyVariant;
  overline: TypographyVariant;
}

export interface ThemeShadow {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

export interface ThemeShadows {
  sm: ThemeShadow;
  md: ThemeShadow;
  lg: ThemeShadow;
}

export interface ThemeSizes {
  inputHeightSm: number;
  inputHeightMd: number;
  inputHeightLg: number;
  iconSm: number;
  iconMd: number;
  iconLg: number;
  avatarSm: number;
  avatarMd: number;
  avatarLg: number;
  avatarXl: number;
}

export interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  radii: ThemeRadii;
  typography: ThemeTypography;
  shadows: ThemeShadows;
  sizes: ThemeSizes;
}

export type PaletteName = 'default' | 'ocean' | 'sunset';

export interface ThemeContextValue {
  theme: Theme;
  colorScheme: 'light' | 'dark';
  palette: PaletteName;
  toggleTheme: () => void;
  setColorScheme: (scheme: ColorScheme) => void;
  setPalette: (palette: PaletteName) => void;
}
