import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { PopoverProps } from './Popover.types';

export const Popover: React.FC<PopoverProps> = ({
  visible, anchor, content, placement = 'bottom', onClose, style, testID,
}) => {
  const { colors, radii, shadows, spacing } = useTheme();

  const posStyle = placement === 'top' ? { bottom: '100%', marginBottom: 8 }
    : placement === 'bottom' ? { top: '100%', marginTop: 8 }
    : placement === 'left' ? { right: '100%', marginRight: 8 }
    : { left: '100%', marginLeft: 8 };

  return (
    <View testID={testID} style={[{ position: 'relative' }, style]}>
      {anchor}
      {visible && (
        <>
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
          <View style={[styles.popover, { backgroundColor: colors.surface, borderRadius: radii.lg, padding: spacing.md, ...shadows.md }, posStyle as any]}>
            {content}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  popover: { position: 'absolute', zIndex: 999, minWidth: 120 },
});
