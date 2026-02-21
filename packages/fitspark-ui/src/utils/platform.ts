import { Platform, Dimensions, StatusBar } from 'react-native';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isWeb = Platform.OS === 'web';

export const getStatusBarHeight = (): number => {
  if (isIOS) return 44;
  return StatusBar.currentHeight ?? 24;
};

export const getBottomInset = (): number => {
  if (isIOS) {
    const { height } = Dimensions.get('window');
    // iPhones with notch have height > 800
    return height >= 812 ? 34 : 0;
  }
  return 0;
};

export const isNotched = (): boolean => {
  if (!isIOS) return false;
  const { height, width } = Dimensions.get('window');
  return height >= 812 || width >= 812;
};

export const hitSlop = (size: number = 8) => ({
  top: size,
  right: size,
  bottom: size,
  left: size,
});

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;
