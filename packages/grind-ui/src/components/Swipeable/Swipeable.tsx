import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
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
import type { SwipeableProps, SwipeAction } from './Swipeable.types';

const ACTION_WIDTH = 80;
const SPRING = { damping: 20, stiffness: 200 };

export const Swipeable: React.FC<SwipeableProps> = ({
  leftActions = [],
  rightActions = [],
  children,
  style,
  testID,
}) => {
  const { colors, spacing, typography, radii } = useTheme();
  const translateX = useSharedValue(0);
  const startX = useSharedValue(0);

  const leftWidth = leftActions.length * ACTION_WIDTH;
  const rightWidth = rightActions.length * ACTION_WIDTH;

  const panGesture = Gesture.Pan()
    .onStart(() => {
      startX.value = translateX.value;
    })
    .onUpdate((e) => {
      let next = startX.value + e.translationX;
      // Clamp
      if (leftActions.length === 0 && next > 0) next = 0;
      if (rightActions.length === 0 && next < 0) next = 0;
      next = Math.max(next, -rightWidth);
      next = Math.min(next, leftWidth);
      translateX.value = next;
    })
    .onEnd((e) => {
      const threshold = ACTION_WIDTH / 2;
      if (translateX.value > threshold && leftActions.length > 0) {
        translateX.value = withSpring(leftWidth, SPRING);
      } else if (translateX.value < -threshold && rightActions.length > 0) {
        translateX.value = withSpring(-rightWidth, SPRING);
      } else {
        translateX.value = withSpring(0, SPRING);
      }
    });

  const animatedContentStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const renderActions = (actions: SwipeAction[], side: 'left' | 'right') => (
    <View
      style={[
        styles.actionsContainer,
        side === 'left' ? styles.leftActions : styles.rightActions,
      ]}
    >
      {actions.map((action, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            translateX.value = withSpring(0, SPRING);
            action.onPress();
          }}
          accessibilityRole="button"
          accessibilityLabel={action.label}
          style={[
            styles.actionBtn,
            {
              backgroundColor: action.color,
              width: ACTION_WIDTH,
            },
          ]}
        >
          {action.icon && <View style={{ marginBottom: 4 }}>{action.icon}</View>}
          <Text
            style={[
              styles.actionLabel,
              {
                color: '#fff',
                fontSize: typography.caption.fontSize,
                fontWeight: typography.h1.fontWeight as any,
              },
            ]}
          >
            {action.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View testID={testID} style={[styles.container, style]}>
      {leftActions.length > 0 && renderActions(leftActions, 'left')}
      {rightActions.length > 0 && renderActions(rightActions, 'right')}

      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.content, animatedContentStyle]}>
          {children}
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    position: 'relative',
  },
  content: {
    zIndex: 1,
  },
  actionsContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    flexDirection: 'row',
  },
  leftActions: {
    left: 0,
  },
  rightActions: {
    right: 0,
  },
  actionBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  actionLabel: {
    textTransform: 'uppercase',
  },
});
