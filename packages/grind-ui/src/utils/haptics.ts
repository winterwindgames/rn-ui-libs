import { Platform } from 'react-native';

let Haptics: typeof import('expo-haptics') | null = null;

try {
  Haptics = require('expo-haptics');
} catch {
  Haptics = null;
}

const noop = () => {};

const canVibrate = Platform.OS === 'ios' || Platform.OS === 'android';

export const hapticLight = canVibrate && Haptics
  ? () => Haptics!.impactAsync(Haptics!.ImpactFeedbackStyle.Light)
  : noop;

export const hapticMedium = canVibrate && Haptics
  ? () => Haptics!.impactAsync(Haptics!.ImpactFeedbackStyle.Medium)
  : noop;

export const hapticHeavy = canVibrate && Haptics
  ? () => Haptics!.impactAsync(Haptics!.ImpactFeedbackStyle.Heavy)
  : noop;

export const hapticSelection = canVibrate && Haptics
  ? () => Haptics!.selectionAsync()
  : noop;
