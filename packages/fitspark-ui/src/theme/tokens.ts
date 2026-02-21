import type { Theme, ThemeSpacing, ThemeRadii, ThemeTypography, ThemeShadows, ThemeSizes } from './types';

const spacing: ThemeSpacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

const radii: ThemeRadii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 100,
  full: 9999,
};

const fontFamily = 'System';

const typography: ThemeTypography = {
  h1: { fontSize: 34, lineHeight: 41, fontWeight: '800', letterSpacing: -0.5 },
  h2: { fontSize: 28, lineHeight: 34, fontWeight: '700', letterSpacing: -0.3 },
  h3: { fontSize: 24, lineHeight: 30, fontWeight: '700', letterSpacing: -0.2 },
  h4: { fontSize: 20, lineHeight: 26, fontWeight: '600' },
  h5: { fontSize: 18, lineHeight: 24, fontWeight: '600' },
  h6: { fontSize: 16, lineHeight: 22, fontWeight: '600' },
  bodyLg: { fontSize: 17, lineHeight: 24, fontWeight: '400' },
  body: { fontSize: 15, lineHeight: 22, fontWeight: '400' },
  bodySm: { fontSize: 13, lineHeight: 18, fontWeight: '400' },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: '400', letterSpacing: 0.2 },
  label: { fontSize: 13, lineHeight: 18, fontWeight: '600', letterSpacing: 0.3, textTransform: 'uppercase' },
  overline: { fontSize: 11, lineHeight: 14, fontWeight: '600', letterSpacing: 1.2, textTransform: 'uppercase' },
  stat: { fontSize: 40, lineHeight: 48, fontWeight: '800', letterSpacing: -1 },
};

const sizes: ThemeSizes = {
  inputHeight: { sm: 36, md: 44, lg: 52 },
  icon: { xs: 14, sm: 18, md: 24, lg: 32, xl: 48 },
  avatar: { xs: 28, sm: 36, md: 48, lg: 64, xl: 96 },
  buttonHeight: { sm: 36, md: 48, lg: 56 },
  headerHeight: 56,
  tabBarHeight: 84,
};

const darkShadows: ThemeShadows = {
  sm: { shadowColor: '#000000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.3, shadowRadius: 2, elevation: 2 },
  md: { shadowColor: '#000000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 8, elevation: 6 },
  lg: { shadowColor: '#000000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 16, elevation: 12 },
};

const lightShadows: ThemeShadows = {
  sm: { shadowColor: '#000000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 3, elevation: 2 },
  md: { shadowColor: '#000000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 6 },
  lg: { shadowColor: '#000000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 16, elevation: 12 },
};

export const darkTheme: Theme = {
  colors: {
    background: '#0D0D0D',
    surface: '#1C1C1E',
    surfaceElevated: '#2A2A2A',
    primary: '#C8FF00',
    primaryDark: '#A8D600',
    text: '#FFFFFF',
    textSecondary: '#8E8E93',
    textMuted: '#636366',
    textInverse: '#0D0D0D',
    border: '#333333',
    borderLight: '#2A2A2A',
    error: '#FF453A',
    success: '#30D158',
    warning: '#FF9F0A',
    info: '#0A84FF',
    overlay: 'rgba(0, 0, 0, 0.7)',
    card: '#1C1C1E',
    cardBorder: '#333333',
    inputBackground: '#1C1C1E',
    disabled: '#2A2A2A',
    disabledText: '#48484A',
    skeleton: '#2A2A2A',
    skeletonHighlight: '#3A3A3C',
  },
  spacing,
  radii,
  typography,
  shadows: darkShadows,
  sizes,
  isDark: true,
};

export const lightTheme: Theme = {
  colors: {
    background: '#F5F5F7',
    surface: '#FFFFFF',
    surfaceElevated: '#F0F0F0',
    primary: '#C8FF00',
    primaryDark: '#A8D600',
    text: '#1C1C1E',
    textSecondary: '#8E8E93',
    textMuted: '#AEAEB2',
    textInverse: '#FFFFFF',
    border: '#E5E5E5',
    borderLight: '#F0F0F0',
    error: '#FF453A',
    success: '#30D158',
    warning: '#FF9F0A',
    info: '#0A84FF',
    overlay: 'rgba(0, 0, 0, 0.4)',
    card: '#FFFFFF',
    cardBorder: '#E5E5E5',
    inputBackground: '#F0F0F0',
    disabled: '#E5E5E5',
    disabledText: '#AEAEB2',
    skeleton: '#E5E5E5',
    skeletonHighlight: '#F0F0F0',
  },
  spacing,
  radii,
  typography,
  shadows: lightShadows,
  sizes,
  isDark: false,
};
