jest.mock('react-native-reanimated', () => {
  const View = require('react-native').View;
  return {
    __esModule: true,
    default: {
      call: () => {},
      createAnimatedComponent: (Comp) => Comp || View,
    },
    useSharedValue: (init) => ({ value: init }),
    useAnimatedStyle: (fn) => fn(),
    withTiming: (val) => val,
    withSpring: (val) => val,
    withRepeat: (val) => val,
    withSequence: (...args) => args[0],
    withDelay: (_delay, val) => val,
    interpolate: (val, inputRange, outputRange) => {
      if (val <= inputRange[0]) return outputRange[0];
      if (val >= inputRange[inputRange.length - 1]) return outputRange[outputRange.length - 1];
      return outputRange[0];
    },
    interpolateColor: (val, input, output) => output[0],
    cancelAnimation: () => {},
    runOnJS: (fn) => fn,
    createAnimatedComponent: (Comp) => Comp || View,
    Easing: {
      inOut: (fn) => fn,
      ease: (v) => v,
      linear: (v) => v,
      out: (fn) => fn,
      in: (fn) => fn,
      bezier: () => (v) => v,
      cubic: (v) => v,
    },
    FadeIn: { duration: () => ({ build: () => ({}) }) },
    FadeOut: { duration: () => ({ build: () => ({}) }) },
    SlideInRight: { duration: () => ({ build: () => ({}) }) },
    SlideOutRight: { duration: () => ({ build: () => ({}) }) },
    Layout: { duration: () => ({ build: () => ({}) }) },
  };
});

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  notificationAsync: jest.fn(),
  selectionAsync: jest.fn(),
}));

jest.mock('expo-linear-gradient', () => {
  const View = require('react-native').View;
  return { LinearGradient: View };
});

jest.mock('@expo/vector-icons', () => {
  const View = require('react-native').View;
  const MockIcon = (props) => View(props);
  return {
    Ionicons: MockIcon,
    MaterialIcons: MockIcon,
    MaterialCommunityIcons: MockIcon,
    FontAwesome: MockIcon,
    FontAwesome5: MockIcon,
    Feather: MockIcon,
    AntDesign: MockIcon,
    Entypo: MockIcon,
  };
});

jest.mock('react-native-gesture-handler', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    GestureHandlerRootView: (props) => React.createElement(View, props),
    GestureDetector: ({ children }) => children,
    Gesture: {
      Pan: () => ({
        onStart: function() { return this; },
        onUpdate: function() { return this; },
        onEnd: function() { return this; },
      }),
    },
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    PanGestureHandler: View,
    BaseButton: View,
    RectButton: View,
    BorderlessButton: View,
    FlatList: require('react-native').FlatList,
    ScrollView: require('react-native').ScrollView,
    TouchableHighlight: require('react-native').TouchableHighlight,
    TouchableOpacity: require('react-native').TouchableOpacity,
    TouchableWithoutFeedback: require('react-native').TouchableWithoutFeedback,
  };
}, { virtual: true });

jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn(() => Promise.resolve()),
  canOpenURL: jest.fn(() => Promise.resolve(true)),
}));
