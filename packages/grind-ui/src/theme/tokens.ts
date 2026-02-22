import type { Theme, ThemeColors, PaletteName } from './types';

const FONT_FAMILY = 'System';

const sharedSpacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

const sharedRadii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 100,
  full: 9999,
} as const;

const sharedTypography = {
  h1: {
    fontFamily: FONT_FAMILY,
    fontSize: 40,
    fontWeight: '800' as const,
    lineHeight: 48,
    letterSpacing: 1.2,
    textTransform: 'uppercase' as const,
  },
  h2: {
    fontFamily: FONT_FAMILY,
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
    letterSpacing: 0.8,
    textTransform: 'uppercase' as const,
  },
  h3: {
    fontFamily: FONT_FAMILY,
    fontSize: 26,
    fontWeight: '700' as const,
    lineHeight: 32,
    letterSpacing: 0.6,
    textTransform: 'uppercase' as const,
  },
  h4: {
    fontFamily: FONT_FAMILY,
    fontSize: 22,
    fontWeight: '600' as const,
    lineHeight: 28,
    letterSpacing: 0.4,
    textTransform: 'uppercase' as const,
  },
  h5: {
    fontFamily: FONT_FAMILY,
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
    letterSpacing: 0.2,
    textTransform: 'uppercase' as const,
  },
  h6: {
    fontFamily: FONT_FAMILY,
    fontSize: 16,
    fontWeight: '600' as const,
    lineHeight: 22,
    letterSpacing: 0.2,
    textTransform: 'uppercase' as const,
  },
  bodyLg: {
    fontFamily: FONT_FAMILY,
    fontSize: 18,
    fontWeight: '400' as const,
    lineHeight: 28,
  },
  body: {
    fontFamily: FONT_FAMILY,
    fontSize: 16,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodySm: {
    fontFamily: FONT_FAMILY,
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
  },
  caption: {
    fontFamily: FONT_FAMILY,
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
    letterSpacing: 0.2,
  },
  label: {
    fontFamily: FONT_FAMILY,
    fontSize: 13,
    fontWeight: '600' as const,
    lineHeight: 18,
    letterSpacing: 0.4,
    textTransform: 'uppercase' as const,
  },
  overline: {
    fontFamily: FONT_FAMILY,
    fontSize: 11,
    fontWeight: '700' as const,
    lineHeight: 16,
    letterSpacing: 1.5,
    textTransform: 'uppercase' as const,
  },
} as const;

const sharedSizes = {
  inputHeightSm: 36,
  inputHeightMd: 44,
  inputHeightLg: 52,
  iconSm: 16,
  iconMd: 24,
  iconLg: 32,
  avatarSm: 32,
  avatarMd: 44,
  avatarLg: 64,
  avatarXl: 96,
} as const;

const lightShadows = {
  sm: { shadowColor: '#000000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 3, elevation: 1 },
  md: { shadowColor: '#000000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
  lg: { shadowColor: '#000000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.1, shadowRadius: 16, elevation: 6 },
} as const;

const darkShadows = {
  sm: { shadowColor: '#000000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 3, elevation: 1 },
  md: { shadowColor: '#000000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 8, elevation: 3 },
  lg: { shadowColor: '#000000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 6 },
} as const;

// ── Default Palette (periwinkle + coral) ──────────────────────────────────────

const defaultLightColors: ThemeColors = {
  background: '#F8FBFC',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  primary: '#787AF3',
  primaryLight: '#B8B9F8',
  secondary: '#E37461',
  secondaryLight: '#EB9784',
  accent: '#F2C94C',
  sage: '#C4CCC2',
  text: '#242222',
  textSecondary: '#6B6B6B',
  textInverse: '#F8FBFC',
  border: '#E2E2E2',
  error: '#E5534B',
  success: '#57A773',
  warning: '#F2C94C',
  info: '#787AF3',
  overlay: 'rgba(36, 34, 34, 0.5)',
};

const defaultDarkColors: ThemeColors = {
  background: '#1A1818',
  surface: '#242222',
  surfaceElevated: '#272727',
  primary: '#787AF3',
  primaryLight: '#5A5CD0',
  secondary: '#E37461',
  secondaryLight: '#EB9784',
  accent: '#F2C94C',
  sage: '#C4CCC2',
  text: '#F8FBFC',
  textSecondary: '#A0A0A0',
  textInverse: '#242222',
  border: '#3A3A3A',
  error: '#E5534B',
  success: '#57A773',
  warning: '#F2C94C',
  info: '#787AF3',
  overlay: 'rgba(0, 0, 0, 0.65)',
};

// ── Ocean Palette (teal + amber) ──────────────────────────────────────────────

const oceanLightColors: ThemeColors = {
  background: '#F0F7FC',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  primary: '#0EA5C9',
  primaryLight: '#7DD3E8',
  secondary: '#D97706',
  secondaryLight: '#F5A623',
  accent: '#0EA5C9',
  sage: '#7B9BAF',
  text: '#0F1923',
  textSecondary: '#5A7A8F',
  textInverse: '#F0F7FC',
  border: '#D0E3F0',
  error: '#DC2626',
  success: '#059669',
  warning: '#D97706',
  info: '#0EA5C9',
  overlay: 'rgba(15,25,35,0.4)',
};

const oceanDarkColors: ThemeColors = {
  background: '#0F1923',
  surface: '#162230',
  surfaceElevated: '#1D2D3E',
  primary: '#22D1EE',
  primaryLight: '#1AA3BC',
  secondary: '#F5A623',
  secondaryLight: '#F7BE5E',
  accent: '#22D1EE',
  sage: '#7B9BAF',
  text: '#E8F1F8',
  textSecondary: '#8BA4B8',
  textInverse: '#0F1923',
  border: '#2A3F52',
  error: '#FF6B6B',
  success: '#4ECDC4',
  warning: '#F5A623',
  info: '#22D1EE',
  overlay: 'rgba(15,25,35,0.65)',
};

// ── Sunset Palette (warm rose + gold) ─────────────────────────────────────────

const sunsetLightColors: ThemeColors = {
  background: '#FDF2F8',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  primary: '#EC4899',
  primaryLight: '#F9A8D4',
  secondary: '#D97706',
  secondaryLight: '#FBBF24',
  accent: '#EC4899',
  sage: '#B8A9B0',
  text: '#1A1218',
  textSecondary: '#6B5460',
  textInverse: '#FDF2F8',
  border: '#F3D5E5',
  error: '#DC2626',
  success: '#059669',
  warning: '#D97706',
  info: '#7C3AED',
  overlay: 'rgba(26,18,24,0.4)',
};

const sunsetDarkColors: ThemeColors = {
  background: '#1A1218',
  surface: '#261C22',
  surfaceElevated: '#2E232A',
  primary: '#F472B6',
  primaryLight: '#C94E8C',
  secondary: '#FBBF24',
  secondaryLight: '#FCD34D',
  accent: '#F472B6',
  sage: '#B8A9B0',
  text: '#FAF0F4',
  textSecondary: '#B8A0AA',
  textInverse: '#1A1218',
  border: '#3D2F36',
  error: '#EF4444',
  success: '#34D399',
  warning: '#FBBF24',
  info: '#A78BFA',
  overlay: 'rgba(26,18,24,0.65)',
};

// ── Palettes map ──────────────────────────────────────────────────────────────

export const palettes: Record<PaletteName, { light: ThemeColors; dark: ThemeColors }> = {
  default: { light: defaultLightColors, dark: defaultDarkColors },
  ocean: { light: oceanLightColors, dark: oceanDarkColors },
  sunset: { light: sunsetLightColors, dark: sunsetDarkColors },
};

// ── Build theme helper ────────────────────────────────────────────────────────

export function buildTheme(palette: PaletteName, scheme: 'light' | 'dark'): Theme {
  const colors = palettes[palette][scheme];
  return {
    colors,
    spacing: sharedSpacing,
    radii: sharedRadii,
    typography: sharedTypography,
    shadows: scheme === 'dark' ? darkShadows : lightShadows,
    sizes: sharedSizes,
  };
}

// ── Backward-compatible exports ───────────────────────────────────────────────

export const lightTheme: Theme = buildTheme('default', 'light');
export const darkTheme: Theme = buildTheme('default', 'dark');
