import type { TextStyle } from 'react-native';

export type ColorScheme = 'light' | 'dark' | 'system';

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceElevated: string;
  primary: string;
  primaryDark: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;
  border: string;
  borderLight: string;
  error: string;
  success: string;
  warning: string;
  info: string;
  overlay: string;
  card: string;
  cardBorder: string;
  inputBackground: string;
  disabled: string;
  disabledText: string;
  skeleton: string;
  skeletonHighlight: string;
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
  fontSize: number;
  lineHeight: number;
  fontWeight: TextStyle['fontWeight'];
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
  stat: TypographyVariant;
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
  inputHeight: {
    sm: number;
    md: number;
    lg: number;
  };
  icon: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  avatar: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  buttonHeight: {
    sm: number;
    md: number;
    lg: number;
  };
  headerHeight: number;
  tabBarHeight: number;
}

export interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  radii: ThemeRadii;
  typography: ThemeTypography;
  shadows: ThemeShadows;
  sizes: ThemeSizes;
  isDark: boolean;
}

export interface ThemeContextValue {
  theme: Theme;
  colorScheme: 'light' | 'dark';
  setColorScheme: (scheme: ColorScheme) => void;
  toggleTheme: () => void;
}
