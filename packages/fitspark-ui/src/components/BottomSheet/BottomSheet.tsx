import React, { useEffect } from 'react';
import { View, Pressable, Dimensions, StyleSheet, Modal as RNModal } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
  useAnimatedGestureHandler,
  runOnJS,
} from 'react-native-reanimated';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTheme } from '../../theme/useTheme';
import { BottomSheetProps } from './BottomSheet.types';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onDismiss,
  children,
  snapPoints = [0.5],
  style,
  testID,
}) => {
  const { colors, radii } = useTheme();
  const maxSnap = Math.max(...snapPoints);
  const sheetHeight = SCREEN_HEIGHT * maxSnap;
  const translateY = useSharedValue(sheetHeight);
  const backdropOpacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      translateY.value = withSpring(0, { damping: 20, stiffness: 150 });
      backdropOpacity.value = withTiming(1, { duration: 300 });
    } else {
      translateY.value = withTiming(sheetHeight, { duration: 250 });
      backdropOpacity.value = withTiming(0, { duration: 250 });
    }
  }, [visible]);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx: any) => {
      const newY = ctx.startY + event.translationY;
      translateY.value = Math.max(0, newY);
    },
    onEnd: (event) => {
      if (event.translationY > sheetHeight * 0.3 || event.velocityY > 500) {
        translateY.value = withTiming(sheetHeight, { duration: 250 });
        backdropOpacity.value = withTiming(0, { duration: 250 });
        if (onDismiss) runOnJS(onDismiss)();
      } else {
        translateY.value = withSpring(0, { damping: 20, stiffness: 150 });
      }
    },
  });

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value * 0.6,
  }));

  return (
    <RNModal visible={visible} transparent animationType="none" onRequestClose={onDismiss}>
      <GestureHandlerRootView style={styles.root}>
        <Pressable style={styles.backdrop} onPress={onDismiss}>
          <Animated.View style={[styles.backdropFill, backdropStyle]} />
        </Pressable>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View
            style={[
              styles.sheet,
              {
                height: sheetHeight,
                backgroundColor: colors.surface || '#1C1C1E',
                borderTopLeftRadius: radii?.xl || 20,
                borderTopRightRadius: radii?.xl || 20,
              },
              sheetStyle,
              style,
            ]}
            testID={testID}
            accessibilityViewIsModal
          >
            <View style={styles.handleContainer}>
              <View style={[styles.handle, { backgroundColor: colors.border || '#333333' }]} />
            </View>
            <View style={styles.content}>{children}</View>
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  backdropFill: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  sheet: {
    overflow: 'hidden',
  },
  handleContainer: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 4,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
  },
  content: {
    flex: 1,
    padding: 16,
  },
});
