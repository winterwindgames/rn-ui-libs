import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { StepIndicatorProps } from './StepIndicator.types';

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps, currentStep = 0, variant = 'horizontal', style, testID,
}) => {
  const { colors, typography, radii } = useTheme();
  const isH = variant === 'horizontal';

  return (
    <View testID={testID} style={[{ flexDirection: isH ? 'row' : 'column', alignItems: isH ? 'center' : 'flex-start' }, style]}>
      {steps.map((step, i) => {
        const done = i < currentStep;
        const active = i === currentStep;
        const dotColor = done || active ? colors.primary : colors.border;
        return (
          <View key={i} style={[{ flexDirection: isH ? 'row' : 'column', alignItems: 'center', flex: isH ? 1 : undefined }]}>
            <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: dotColor, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: done || active ? colors.textInverse : colors.textMuted, fontSize: 12, fontWeight: '700' }}>{done ? '✓' : i + 1}</Text>
            </View>
            <Text style={{ color: active ? colors.text : colors.textMuted, ...typography.caption, marginTop: isH ? 4 : 0, marginLeft: isH ? 0 : 8 }}>{step}</Text>
            {i < steps.length - 1 && <View style={{ flex: 1, height: isH ? 2 : undefined, width: isH ? undefined : 2, backgroundColor: colors.border, marginHorizontal: isH ? 4 : 0, marginVertical: isH ? 0 : 4, minWidth: isH ? 16 : undefined, minHeight: isH ? undefined : 16 }} />}
          </View>
        );
      })}
    </View>
  );
};
