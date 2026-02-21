import { Platform } from 'react-native';

type ImpactStyle = 'light' | 'medium' | 'heavy';

let Haptics: typeof import('expo-haptics') | null = null;

try {
  Haptics = require('expo-haptics');
} catch {
  Haptics = null;
}

const canHaptic = Platform.OS === 'ios' || Platform.OS === 'android';

export const haptics = {
  impact: (style: ImpactStyle = 'medium') => {
    if (!canHaptic || !Haptics) return;
    const map = {
      light: Haptics.ImpactFeedbackStyle.Light,
      medium: Haptics.ImpactFeedbackStyle.Medium,
      heavy: Haptics.ImpactFeedbackStyle.Heavy,
    };
    Haptics.impactAsync(map[style]);
  },

  selection: () => {
    if (!canHaptic || !Haptics) return;
    Haptics.selectionAsync();
  },

  notification: (type: 'success' | 'warning' | 'error' = 'success') => {
    if (!canHaptic || !Haptics) return;
    const map = {
      success: Haptics.NotificationFeedbackType.Success,
      warning: Haptics.NotificationFeedbackType.Warning,
      error: Haptics.NotificationFeedbackType.Error,
    };
    Haptics.notificationAsync(map[type]);
  },
};
