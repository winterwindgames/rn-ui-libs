import { Platform } from 'react-native';

let Haptics: any = null;

try {
  Haptics = require('expo-haptics');
} catch {}

export const haptics = {
  light: () => {
    if (Platform.OS === 'ios' && Haptics) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  },
  medium: () => {
    if (Platform.OS === 'ios' && Haptics) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  },
  heavy: () => {
    if (Platform.OS === 'ios' && Haptics) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
  },
  success: () => {
    if (Platform.OS === 'ios' && Haptics) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  },
  error: () => {
    if (Platform.OS === 'ios' && Haptics) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  },
  selection: () => {
    if (Platform.OS === 'ios' && Haptics) {
      Haptics.selectionAsync();
    }
  },
};
