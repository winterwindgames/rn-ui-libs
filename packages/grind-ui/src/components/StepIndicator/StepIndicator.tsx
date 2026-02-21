import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import type { StepIndicatorProps } from './StepIndicator.types';

const CIRCLE_SIZE = 32;
const LINE_HEIGHT = 3;

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
  completedColor,
  style,
  testID,
}) => {
  const { colors, spacing, typography, radii } = useTheme();
  const doneColor = completedColor ?? colors.primary;
  const pendingColor = colors.border ?? colors.textSecondary;

  return (
    <View
      testID={testID}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: steps.length - 1, now: currentStep }}
      style={[styles.container, { paddingVertical: spacing.md }, style]}
    >
      <View style={styles.row}>
        {steps.map((label, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isActive = isCompleted || isCurrent;
          const circleColor = isActive ? doneColor : pendingColor;

          return (
            <React.Fragment key={index}>
              {/* Circle */}
              <View style={styles.stepItem}>
                <View
                  style={[
                    styles.circle,
                    {
                      backgroundColor: isActive ? circleColor : 'transparent',
                      borderColor: circleColor,
                      borderWidth: 2,
                    },
                  ]}
                >
                  {isCompleted ? (
                    <Text style={[styles.checkmark, { color: '#fff' }]}>✓</Text>
                  ) : (
                    <Text
                      style={[
                        styles.stepNumber,
                        {
                          color: isActive ? '#fff' : pendingColor,
                          fontWeight: typography.h1.fontWeight as any,
                        },
                      ]}
                    >
                      {index + 1}
                    </Text>
                  )}
                </View>
                <Text
                  style={[
                    styles.label,
                    {
                      color: isActive ? colors.text : colors.textSecondary,
                      fontSize: typography.caption.fontSize,
                      fontWeight: isCurrent
                        ? (typography.h1.fontWeight as any)
                        : (typography.body.fontWeight as any),
                      marginTop: spacing.xs,
                    },
                  ]}
                  numberOfLines={2}
                >
                  {label}
                </Text>
              </View>

              {/* Connecting line */}
              {index < steps.length - 1 && (
                <View
                  style={[
                    styles.line,
                    {
                      backgroundColor: index < currentStep ? doneColor : pendingColor,
                      height: LINE_HEIGHT,
                      borderRadius: LINE_HEIGHT / 2,
                    },
                  ]}
                />
              )}
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  stepItem: {
    alignItems: 'center',
    width: 64,
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    fontSize: 14,
    fontWeight: '700',
  },
  stepNumber: {
    fontSize: 13,
  },
  label: {
    textAlign: 'center',
  },
  line: {
    flex: 1,
    marginTop: CIRCLE_SIZE / 2 - LINE_HEIGHT / 2,
  },
});
