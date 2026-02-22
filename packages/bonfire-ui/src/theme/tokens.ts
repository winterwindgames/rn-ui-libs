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
  xl: 20,
  pill: 100,
  full: 9999,
};

const typography: ThemeTypography = {
  h1: { fontSize: 32, lineHeight: 40, fontWeight: '700' },
  h2: { fontSize: 26, lineHeight: 34, fontWeight: '700' },
  h3: { fontSize: 22, lineHeight: 30, fontWeight: '600' },
  h4: { fontSize: 20, lineHeight: 28, fontWeight: '600' },
  h5: { fontSize: 17, lineHeight: 24, fontWeight: '600' },
  h6: { fontSize: 15, lineHeight: 22, fontWeight: '600' },
  bodyLg: { fontSize: 17, lineHeight: 26, fontWeight: '400' },
  body: { fontSize: 15, lineHeight: 24, fontWeight: '400' },
  bodySm: { fontSize: 13, lineHeight: 20, fontWeight: '400' },
  caption: { fontSize: 12, lineHeight: 18, fontWeight: '400' },
  label: { fontSize: 13, lineHeight: 18, fontWeight: '600', letterSpacing: 0.3 },
  overline: { fontSize: 11, lineHeight: 16, fontWeight: '700', letterSpacing: 1.2, textTransform: 'uppercase' },
  stat: { fontSize: 40, lineHeight: 48, fontWeight: '800' },
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
  sm: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.3, shadowRadius: 2, elevation: 2 },
  md: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.35, shadowRadius: 8, elevation: 6 },
  lg: { shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 16, elevation: 12 },
};

const lightShadows: ThemeShadows = {
  sm: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 3, elevation: 2 },
  md: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 6 },
  lg: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 16, elevation: 12 },
};

// ── Default palette (Coral) ────────────────────────────────────────
const defaultDarkColors: ThemeColors = {
  background: '#0D0D0F', surface: '#1A1A1F', surfaceElevated: '#252530',
  primary: '#FF3B6F', primaryDark: '#D92B5A',
  text: '#FFFFFF', textSecondary: '#9B9BA7', textMuted: '#5C5C6B', textInverse: '#0D0D0F',
  border: '#2A2A35', borderLight: '#1F1F28',
  error: '#FF4757', success: '#2ED573', warning: '#FFA502', info: '#3742FA',
  overlay: 'rgba(0,0,0,0.6)', card: '#1A1A1F', cardBorder: '#2A2A35',
  inputBackground: '#1A1A1F', disabled: '#1F1F28', disabledText: '#5C5C6B',
  skeleton: '#1F1F28', skeletonHighlight: '#2A2A35',
};

const defaultLightColors: ThemeColors = {
  background: '#F8F8FA', surface: '#FFFFFF', surfaceElevated: '#FFFFFF',
  primary: '#FF3B6F', primaryDark: '#D92B5A',
  text: '#1A1A1F', textSecondary: '#6B6B7B', textMuted: '#9B9BA7', textInverse: '#FFFFFF',
  border: '#E8E8ED', borderLight: '#F0F0F5',
  error: '#FF4757', success: '#2ED573', warning: '#FFA502', info: '#3742FA',
  overlay: 'rgba(0,0,0,0.4)', card: '#FFFFFF', cardBorder: '#E8E8ED',
  inputBackground: '#F0F0F5', disabled: '#E8E8ED', disabledText: '#9B9BA7',
  skeleton: '#E8E8ED', skeletonHighlight: '#F0F0F5',
};

// ── Ocean palette (Blue) ───────────────────────────────────────────
const oceanDarkColors: ThemeColors = {
  background: '#0A0E1A', surface: '#141B2D', surfaceElevated: '#1E2840',
  primary: '#4A90FF', primaryDark: '#3570D4',
  text: '#FFFFFF', textSecondary: '#8B95A8', textMuted: '#556178', textInverse: '#0A0E1A',
  border: '#243046', borderLight: '#1A2338',
  error: '#FF4757', success: '#2ED573', warning: '#FFA502', info: '#4A90FF',
  overlay: 'rgba(0,0,0,0.6)', card: '#141B2D', cardBorder: '#243046',
  inputBackground: '#141B2D', disabled: '#1A2338', disabledText: '#556178',
  skeleton: '#1A2338', skeletonHighlight: '#243046',
};

const oceanLightColors: ThemeColors = {
  background: '#F5F8FF', surface: '#FFFFFF', surfaceElevated: '#FFFFFF',
  primary: '#4A90FF', primaryDark: '#3570D4',
  text: '#141B2D', textSecondary: '#6B7890', textMuted: '#97A3B8', textInverse: '#FFFFFF',
  border: '#DDE4F0', borderLight: '#EDF1F9',
  error: '#FF4757', success: '#2ED573', warning: '#FFA502', info: '#4A90FF',
  overlay: 'rgba(0,0,0,0.4)', card: '#FFFFFF', cardBorder: '#DDE4F0',
  inputBackground: '#EDF1F9', disabled: '#DDE4F0', disabledText: '#97A3B8',
  skeleton: '#DDE4F0', skeletonHighlight: '#EDF1F9',
};

// ── Lavender palette (Purple) ──────────────────────────────────────
const lavenderDarkColors: ThemeColors = {
  background: '#0D0A14', surface: '#1A1525', surfaceElevated: '#252035',
  primary: '#A855F7', primaryDark: '#8B3DD4',
  text: '#FFFFFF', textSecondary: '#9B8FA8', textMuted: '#6B5C7B', textInverse: '#0D0A14',
  border: '#302848', borderLight: '#221D30',
  error: '#FF4757', success: '#2ED573', warning: '#FFA502', info: '#A855F7',
  overlay: 'rgba(0,0,0,0.6)', card: '#1A1525', cardBorder: '#302848',
  inputBackground: '#1A1525', disabled: '#221D30', disabledText: '#6B5C7B',
  skeleton: '#221D30', skeletonHighlight: '#302848',
};

const lavenderLightColors: ThemeColors = {
  background: '#FAF5FF', surface: '#FFFFFF', surfaceElevated: '#FFFFFF',
  primary: '#A855F7', primaryDark: '#8B3DD4',
  text: '#1A1525', textSecondary: '#7B6B90', textMuted: '#A89BB8', textInverse: '#FFFFFF',
  border: '#E8DDF0', borderLight: '#F3EDF9',
  error: '#FF4757', success: '#2ED573', warning: '#FFA502', info: '#A855F7',
  overlay: 'rgba(0,0,0,0.4)', card: '#FFFFFF', cardBorder: '#E8DDF0',
  inputBackground: '#F3EDF9', disabled: '#E8DDF0', disabledText: '#A89BB8',
  skeleton: '#E8DDF0', skeletonHighlight: '#F3EDF9',
};

export const darkTheme: Theme = {
  colors: defaultDarkColors,
  spacing, radii, typography, shadows: darkShadows, sizes, isDark: true,
};

export const lightTheme: Theme = {
  colors: defaultLightColors,
  spacing, radii, typography, shadows: lightShadows, sizes, isDark: false,
};

export const palettes: Record<PaletteName, { light: ThemeColors; dark: ThemeColors }> = {
  default: { light: defaultLightColors, dark: defaultDarkColors },
  ocean: { light: oceanLightColors, dark: oceanDarkColors },
  lavender: { light: lavenderLightColors, dark: lavenderDarkColors },
};

export function buildTheme(palette: PaletteName, scheme: 'light' | 'dark'): Theme {
  const isDark = scheme === 'dark';
  return {
    colors: palettes[palette][scheme],
    spacing, radii, typography,
    shadows: isDark ? darkShadows : lightShadows,
    sizes, isDark,
  };
}
