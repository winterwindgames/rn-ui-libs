import { Platform } from 'react-native';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isWeb = Platform.OS === 'web';

interface PlatformSelectOptions<T> {
  ios?: T;
  android?: T;
  web?: T;
  default: T;
}

export const platformSelect = <T>(options: PlatformSelectOptions<T>): T => {
  if (isIOS && options.ios !== undefined) return options.ios;
  if (isAndroid && options.android !== undefined) return options.android;
  if (isWeb && options.web !== undefined) return options.web;
  return options.default;
};
