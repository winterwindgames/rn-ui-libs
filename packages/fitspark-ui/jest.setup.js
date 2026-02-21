jest.mock('react-native-reanimated', () => {
  const View = require('react-native').View;
  return {
    __esModule: true,
    default: { call: () => {} },
    useSharedValue: (init) => ({ value: init }),
    useAnimatedStyle: (fn) => fn(),
    withTiming: (val) => val,
    withSpring: (val) => val,
    withRepeat: (val) => val,
    withSequence: (...args) => args[0],
    withDelay: (_, val) => val,
    interpolate: (val) => val,
    interpolateColor: (val, input, output) => output[0],
    createAnimatedComponent: (Comp) => Comp,
    Easing: { inOut: (fn) => fn, ease: (v) => v, bezier: () => (v) => v },
    FadeIn: { duration: () => ({ build: () => ({}) }) },
    FadeOut: { duration: () => ({ build: () => ({}) }) },
    FadeInDown: { duration: () => ({ build: () => ({}) }) },
    FadeOutUp: { duration: () => ({ build: () => ({}) }) },
    SlideInRight: { duration: () => ({ build: () => ({}) }) },
    SlideOutRight: { duration: () => ({ build: () => ({}) }) },
    SlideInDown: { duration: () => ({ build: () => ({}) }) },
    SlideOutDown: { duration: () => ({ build: () => ({}) }) },
    SlideInUp: { duration: () => ({ build: () => ({}) }) },
    SlideOutUp: { duration: () => ({ build: () => ({}) }) },
    Layout: { duration: () => ({ build: () => ({}) }) },
    ZoomIn: { duration: () => ({ build: () => ({}) }) },
    ZoomOut: { duration: () => ({ build: () => ({}) }) },
    runOnJS: (fn) => fn,
    runOnUI: (fn) => fn,
    useAnimatedGestureHandler: () => ({}),
    useDerivedValue: (fn) => ({ value: fn() }),
    useAnimatedRef: () => ({ current: null }),
    measure: () => ({ x: 0, y: 0, width: 0, height: 0, pageX: 0, pageY: 0 }),
    Extrapolation: { CLAMP: 'clamp' },
  };
});

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  notificationAsync: jest.fn(),
  selectionAsync: jest.fn(),
  ImpactFeedbackStyle: { Light: 'light', Medium: 'medium', Heavy: 'heavy' },
  NotificationFeedbackType: { Success: 'success', Warning: 'warning', Error: 'error' },
}));

jest.mock('expo-linear-gradient', () => {
  const View = require('react-native').View;
  return { LinearGradient: View };
});
