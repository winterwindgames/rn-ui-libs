import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import { useTheme } from '../../theme/useTheme';
import { SwipeableProps } from './Swipeable.types';

export const Swipeable: React.FC<SwipeableProps> = ({
  children,
  leftActions = [],
  rightActions = [],
  actionWidth = 72,
  style,
  testID = 'swipeable',
}) => {
  const { colors, radii } = useTheme();
  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);

  const maxLeft = leftActions.length * actionWidth;
  const maxRight = rightActions.length * actionWidth;

  const panGesture = Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value;
    })
    .onUpdate((event) => {
      const newX = startX.value + event.translationX;
      translateX.value = Math.max(-maxRight, Math.min(maxLeft, newX));
    })
    .onEnd((event) => {
      const threshold = actionWidth / 2;
      if (translateX.value > threshold && leftActions.length > 0) {
        translateX.value = withSpring(maxLeft);
      } else if (translateX.value < -threshold && rightActions.length > 0) {
        translateX.value = withSpring(-maxRight);
      } else {
        translateX.value = withSpring(0);
      }
    });

  const contentStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const close = () => {
    translateX.value = withSpring(0);
  };

  return (
    <GestureHandlerRootView>
      <View
        style={[styles.container, { borderRadius: radii.md }, style]}
        testID={testID}
        accessibilityRole="none"
      >
        {/* Left actions */}
        <View style={[styles.actionsLeft, { left: 0 }]}>
          {leftActions.map((action) => (
            <TouchableOpacity
              key={action.key}
              onPress={() => {
                action.onPress();
                close();
              }}
              style={[
                styles.actionBtn,
                { backgroundColor: action.color, width: actionWidth },
              ]}
              accessibilityRole="button"
              accessibilityLabel={action.label}
            >
              {action.icon}
              <Text style={styles.actionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Right actions */}
        <View style={[styles.actionsRight, { right: 0 }]}>
          {rightActions.map((action) => (
            <TouchableOpacity
              key={action.key}
              onPress={() => {
                action.onPress();
                close();
              }}
              style={[
                styles.actionBtn,
                { backgroundColor: action.color, width: actionWidth },
              ]}
              accessibilityRole="button"
              accessibilityLabel={action.label}
            >
              {action.icon}
              <Text style={styles.actionLabel}>{action.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Main content */}
        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[
              styles.content,
              { backgroundColor: colors.surface },
              contentStyle,
            ]}
          >
            {children}
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  actionsLeft: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    flexDirection: 'row',
  },
  actionsRight: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    flexDirection: 'row',
  },
  actionBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  actionLabel: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  content: {
    zIndex: 1,
  },
});
