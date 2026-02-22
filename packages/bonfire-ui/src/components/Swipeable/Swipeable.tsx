import React, { useRef } from 'react';
import { View, Text, Pressable, PanResponder, Animated, StyleSheet } from 'react-native';
import type { SwipeableProps } from './Swipeable.types';

export const Swipeable: React.FC<SwipeableProps> = ({
  leftActions = [], rightActions = [], children, style, testID,
}) => {
  const translateX = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dx) > 10,
      onPanResponderMove: (_, g) => { translateX.setValue(g.dx); },
      onPanResponderRelease: (_, g) => {
        if (g.dx > 60 && leftActions.length) {
          Animated.spring(translateX, { toValue: 80, useNativeDriver: true }).start();
        } else if (g.dx < -60 && rightActions.length) {
          Animated.spring(translateX, { toValue: -80, useNativeDriver: true }).start();
        } else {
          Animated.spring(translateX, { toValue: 0, useNativeDriver: true }).start();
        }
      },
    })
  ).current;

  return (
    <View testID={testID} style={[styles.container, style]}>
      <View style={[styles.actions, styles.leftActions]}>
        {leftActions.map((a, i) => (
          <Pressable key={i} onPress={a.onPress} style={[styles.action, { backgroundColor: a.color }]}>
            <Text style={styles.actionText}>{a.label}</Text>
          </Pressable>
        ))}
      </View>
      <View style={[styles.actions, styles.rightActions]}>
        {rightActions.map((a, i) => (
          <Pressable key={i} onPress={a.onPress} style={[styles.action, { backgroundColor: a.color }]}>
            <Text style={styles.actionText}>{a.label}</Text>
          </Pressable>
        ))}
      </View>
      <Animated.View {...panResponder.panHandlers} style={{ transform: [{ translateX }] }}>
        {children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { position: 'relative', overflow: 'hidden' },
  actions: { position: 'absolute', top: 0, bottom: 0, flexDirection: 'row' },
  leftActions: { left: 0 },
  rightActions: { right: 0 },
  action: { width: 80, justifyContent: 'center', alignItems: 'center' },
  actionText: { color: '#fff', fontWeight: '600', fontSize: 13 },
});
