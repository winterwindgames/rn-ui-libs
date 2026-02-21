import React, { useEffect, useRef } from 'react';
import {
  Dimensions,
  Modal,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import type { BottomSheetProps } from './BottomSheet.types';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const DEFAULT_SNAP_POINTS = [SCREEN_HEIGHT * 0.4, SCREEN_HEIGHT * 0.7];

export const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  snapPoints = DEFAULT_SNAP_POINTS,
  title,
  showHandle = true,
  children,
  style,
  testID,
}) => {
  const { colors, spacing, radii, typography, shadows } = useTheme();
  const translateY = useSharedValue(SCREEN_HEIGHT);
  const backdropOpacity = useSharedValue(0);
  const currentSnapIndex = useRef(0);
  const startY = useRef(0);

  const sortedSnaps = [...snapPoints].sort((a, b) => a - b);
  const maxHeight = sortedSnaps[sortedSnaps.length - 1];

  useEffect(() => {
    if (visible) {
      const initialSnap = sortedSnaps[0];
      translateY.value = withSpring(SCREEN_HEIGHT - initialSnap, {
        damping: 20,
        stiffness: 200,
      });
      backdropOpacity.value = withTiming(1, { duration: 300 });
      currentSnapIndex.current = 0;
    } else {
      translateY.value = withTiming(SCREEN_HEIGHT, { duration: 250 });
      backdropOpacity.value = withTiming(0, { duration: 250 });
    }
  }, [visible]);

  const snapToClosest = (currentTranslateY: number) => {
    const sheetTop = currentTranslateY;
    const sheetHeight = SCREEN_HEIGHT - sheetTop;

    let closestIdx = 0;
    let minDist = Infinity;
    sortedSnaps.forEach((snap, i) => {
      const dist = Math.abs(sheetHeight - snap);
      if (dist < minDist) {
        minDist = dist;
        closestIdx = i;
      }
    });

    // If dragged far down, dismiss
    if (sheetHeight < sortedSnaps[0] * 0.5) {
      onClose();
      return;
    }

    currentSnapIndex.current = closestIdx;
    translateY.value = withSpring(SCREEN_HEIGHT - sortedSnaps[closestIdx], {
      damping: 20,
      stiffness: 200,
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dy) > 5,
      onPanResponderGrant: () => {
        startY.current = translateY.value;
      },
      onPanResponderMove: (_, g) => {
        const newY = startY.current + g.dy;
        const minY = SCREEN_HEIGHT - maxHeight;
        translateY.value = Math.max(minY, newY);
      },
      onPanResponderRelease: (_, g) => {
        const velocity = g.vy;
        if (velocity > 1.5) {
          onClose();
          return;
        }
        if (velocity < -1.5 && sortedSnaps.length > 1) {
          const nextIdx = Math.min(currentSnapIndex.current + 1, sortedSnaps.length - 1);
          currentSnapIndex.current = nextIdx;
          translateY.value = withSpring(SCREEN_HEIGHT - sortedSnaps[nextIdx], {
            damping: 20,
            stiffness: 200,
          });
          return;
        }
        snapToClosest(translateY.value);
      },
    })
  ).current;

  const animatedSheet = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const animatedBackdrop = useAnimatedStyle(() => ({
    opacity: backdropOpacity.value,
  }));

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.container}>
        <Animated.View style={[styles.backdrop, animatedBackdrop]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        </Animated.View>
        <Animated.View
          testID={testID}
          accessibilityRole="none"
          accessibilityViewIsModal
          style={[
            styles.sheet,
            {
              backgroundColor: colors.surface ?? '#272727',
              borderTopLeftRadius: radii.xl,
              borderTopRightRadius: radii.xl,
              height: maxHeight + 100, // extra for overscroll
              ...shadows.lg,
            },
            animatedSheet,
            style,
          ]}
        >
          <View {...panResponder.panHandlers} style={styles.handleArea}>
            {showHandle && (
              <View
                style={[
                  styles.handle,
                  {
                    backgroundColor: colors.border ?? '#444',
                    borderRadius: radii.full,
                  },
                ]}
              />
            )}
          </View>
          {title && (
            <View style={[styles.titleRow, { paddingHorizontal: spacing.lg, marginBottom: spacing.sm }]}>
              <Text
                accessibilityRole="header"
                style={{
                  color: colors.text ?? '#F8FBFC',
                  fontFamily: typography.h5?.fontFamily ?? typography.body.fontFamily,
                  fontSize: typography.h5?.fontSize ?? 18,
                  fontWeight: '700',
                }}
              >
                {title}
              </Text>
            </View>
          )}
          <View style={{ paddingHorizontal: spacing.lg, flex: 1 }}>{children}</View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  handleArea: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  handle: {
    width: 36,
    height: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
