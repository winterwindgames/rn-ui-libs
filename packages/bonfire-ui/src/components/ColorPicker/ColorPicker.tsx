import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { ColorPickerProps } from './ColorPicker.types';

const DEFAULT_COLORS = ['#FF3B6F','#4A90FF','#A855F7','#2ED573','#FFA502','#FF4757','#3742FA','#FFFFFF'];

export const ColorPicker: React.FC<ColorPickerProps> = ({
  colors: palette = DEFAULT_COLORS, value, onChange, size = 36, style, testID,
}) => {
  const { colors: themeColors, radii } = useTheme();

  return (
    <View testID={testID} style={[styles.container, style]}>
      {palette.map((c) => (
        <Pressable
          key={c}
          onPress={() => onChange?.(c)}
          accessibilityRole="button"
          accessibilityLabel={`Color ${c}`}
          accessibilityState={{ selected: c === value }}
          style={[
            styles.swatch,
            { width: size, height: size, borderRadius: size / 2, backgroundColor: c,
              borderWidth: c === value ? 3 : 0, borderColor: themeColors.text },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  swatch: {},
});
