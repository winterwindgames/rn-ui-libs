import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../theme/useTheme';
import { StepIndicatorProps } from './StepIndicator.types';

const StepCircle: React.FC<{
  index: number;
  status: 'completed' | 'active' | 'upcoming';
  accentColor: string;
  surfaceColor: string;
  textColor: string;
  mutedColor: string;
}> = ({ index, status, accentColor, surfaceColor, textColor, mutedColor }) => {
  const bgStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(
      status === 'completed' || status === 'active' ? accentColor : surfaceColor,
      { duration: 300 }
    ),
    borderColor: withTiming(
      status === 'active' ? accentColor : status === 'completed' ? accentColor : mutedColor,
      { duration: 300 }
    ),
  }));

  return (
    <Animated.View style={[styles.circle, bgStyle]}>
      <Text
        style={[
          styles.circleText,
          {
            color:
              status === 'completed' || status === 'active'
                ? '#0D0D0D'
                : mutedColor,
          },
        ]}
      >
        {status === 'completed' ? '✓' : `${index + 1}`}
      </Text>
    </Animated.View>
  );
};

const ConnectorLine: React.FC<{
  completed: boolean;
  accentColor: string;
  mutedColor: string;
}> = ({ completed, accentColor, mutedColor }) => {
  const lineStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(completed ? accentColor : mutedColor, {
      duration: 300,
    }),
  }));

  return <Animated.View style={[styles.line, lineStyle]} />;
};

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
  style,
  testID = 'step-indicator',
}) => {
  const { colors, spacing, typography } = useTheme();

  return (
    <View
      style={[styles.container, { paddingHorizontal: spacing.md }, style]}
      accessibilityRole="progressbar"
      accessibilityLabel={`Step ${currentStep + 1} of ${steps.length}`}
      testID={testID}
    >
      <View style={styles.stepsRow}>
        {steps.map((step, index) => {
          const status =
            index < currentStep
              ? 'completed'
              : index === currentStep
              ? 'active'
              : 'upcoming';

          return (
            <React.Fragment key={index}>
              <View style={styles.stepItem}>
                <StepCircle
                  index={index}
                  status={status}
                  accentColor={colors.primary}
                  surfaceColor={colors.surfaceHighlight}
                  textColor={colors.text}
                  mutedColor={colors.textMuted}
                />
                {step.label ? (
                  <Text
                    style={[
                      styles.label,
                      {
                        color:
                          status === 'upcoming'
                            ? colors.textMuted
                            : colors.text,
                        ...typography.caption,
                      },
                    ]}
                    numberOfLines={1}
                  >
                    {step.label}
                  </Text>
                ) : null}
              </View>
              {index < steps.length - 1 && (
                <ConnectorLine
                  completed={index < currentStep}
                  accentColor={colors.primary}
                  mutedColor={colors.border}
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
    paddingVertical: 16,
  },
  stepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepItem: {
    alignItems: 'center',
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleText: {
    fontSize: 13,
    fontWeight: '700',
  },
  label: {
    marginTop: 6,
    maxWidth: 72,
    textAlign: 'center',
  },
  line: {
    flex: 1,
    height: 2,
    marginHorizontal: 4,
    borderRadius: 1,
  },
});
