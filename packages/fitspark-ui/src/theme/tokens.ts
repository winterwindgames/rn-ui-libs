import type { Theme, ThemeSpacing, ThemeRadii, ThemeTypography, ThemeShadows, ThemeSizes, ThemeColors, PaletteName } from './types';

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

// ── Electric palette ────────────────────────────────────────────────
const electricDarkColors: ThemeColors = {
  background: '#080B12', surface: '#111827', surfaceElevated: '#1E293B',
  primary: '#3B82F6', primaryDark: '#2563EB',
  text: '#F8FAFC', textSecondary: '#94A3B8', textMuted: '#64748B', textInverse: '#080B12',
  border: '#334155', borderLight: '#1E293B',
  error: '#EF4444', success: '#22C55E', warning: '#F59E0B', info: '#06B6D4',
  overlay: 'rgba(8,11,18,0.7)', card: '#111827', cardBorder: '#334155',
  inputBackground: '#111827', disabled: '#1E293B', disabledText: '#475569',
  skeleton: '#1E293B', skeletonHighlight: '#334155',
};

const electricLightColors: ThemeColors = {
  background: '#F1F5F9', surface: '#FFFFFF', surfaceElevated: '#F8FAFC',
  primary: '#2563EB', primaryDark: '#1D4ED8',
  text: '#0F172A', textSecondary: '#64748B', textMuted: '#94A3B8', textInverse: '#FFFFFF',
  border: '#CBD5E1', borderLight: '#E2E8F0',
  error: '#DC2626', success: '#16A34A', warning: '#D97706', info: '#0891B2',
  overlay: 'rgba(15,23,42,0.4)', card: '#FFFFFF', cardBorder: '#E2E8F0',
  inputBackground: '#F8FAFC', disabled: '#E2E8F0', disabledText: '#94A3B8',
  skeleton: '#E2E8F0', skeletonHighlight: '#F1F5F9',
};

// ── Ember palette ──────────────────────────────────────────────────
const emberDarkColors: ThemeColors = {
  background: '#0C0A09', surface: '#1C1917', surfaceElevated: '#292524',
  primary: '#F97316', primaryDark: '#EA580C',
  text: '#FAFAF9', textSecondary: '#A8A29E', textMuted: '#78716C', textInverse: '#0C0A09',
  border: '#44403C', borderLight: '#292524',
  error: '#EF4444', success: '#22C55E', warning: '#FBBF24', info: '#F97316',
  overlay: 'rgba(12,10,9,0.7)', card: '#1C1917', cardBorder: '#44403C',
  inputBackground: '#1C1917', disabled: '#292524', disabledText: '#57534E',
  skeleton: '#292524', skeletonHighlight: '#44403C',
};

const emberLightColors: ThemeColors = {
  background: '#FAFAF9', surface: '#FFFFFF', surfaceElevated: '#FFF7ED',
  primary: '#EA580C', primaryDark: '#C2410C',
  text: '#1C1917', textSecondary: '#78716C', textMuted: '#A8A29E', textInverse: '#FFFFFF',
  border: '#E7E5E4', borderLight: '#F5F5F4',
  error: '#DC2626', success: '#16A34A', warning: '#D97706', info: '#EA580C',
  overlay: 'rgba(28,25,23,0.4)', card: '#FFFFFF', cardBorder: '#E7E5E4',
  inputBackground: '#F5F5F4', disabled: '#E7E5E4', disabledText: '#A8A29E',
  skeleton: '#E7E5E4', skeletonHighlight: '#F5F5F4',
};

// ── Emerald palette ────────────────────────────────────────────────
const emeraldDarkColors: ThemeColors = {
  background: '#0a0a0a', surface: '#171717', surfaceElevated: '#262626',
  primary: '#10B981', primaryDark: '#059669',
  text: '#FAFAFA', textSecondary: '#A1A1AA', textMuted: '#71717A', textInverse: '#0a0a0a',
  border: '#3F3F46', borderLight: '#27272A',
  error: '#EF4444', success: '#10B981', warning: '#FBBF24', info: '#10B981',
  overlay: 'rgba(10,10,10,0.7)', card: '#171717', cardBorder: '#3F3F46',
  inputBackground: '#171717', disabled: '#262626', disabledText: '#52525B',
  skeleton: '#262626', skeletonHighlight: '#3F3F46',
};

const emeraldLightColors: ThemeColors = {
  background: '#FAFAFA', surface: '#FFFFFF', surfaceElevated: '#ECFDF5',
  primary: '#059669', primaryDark: '#047857',
  text: '#18181B', textSecondary: '#71717A', textMuted: '#A1A1AA', textInverse: '#FFFFFF',
  border: '#E4E4E7', borderLight: '#F4F4F5',
  error: '#DC2626', success: '#059669', warning: '#D97706', info: '#059669',
  overlay: 'rgba(24,24,27,0.4)', card: '#FFFFFF', cardBorder: '#E4E4E7',
  inputBackground: '#F4F4F5', disabled: '#E4E4E7', disabledText: '#A1A1AA',
  skeleton: '#E4E4E7', skeletonHighlight: '#F4F4F5',
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

// ── Palettes map ───────────────────────────────────────────────────
export const palettes: Record<PaletteName, { light: ThemeColors; dark: ThemeColors }> = {
  default: { light: lightTheme.colors, dark: darkTheme.colors },
  electric: { light: electricLightColors, dark: electricDarkColors },
  ember: { light: emberLightColors, dark: emberDarkColors },
  emerald: { light: emeraldLightColors, dark: emeraldDarkColors },
};

export function buildTheme(palette: PaletteName, scheme: 'light' | 'dark'): Theme {
  const isDark = scheme === 'dark';
  return {
    colors: palettes[palette][scheme],
    spacing,
    radii,
    typography,
    shadows: isDark ? darkShadows : lightShadows,
    sizes,
    isDark,
  };
}
