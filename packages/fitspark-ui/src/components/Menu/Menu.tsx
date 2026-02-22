import React, { useCallback, useRef, useState } from 'react';
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  Modal,
} from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { MenuProps } from './Menu.types';

export const Menu: React.FC<MenuProps> = ({
  trigger,
  items,
  visible,
  onClose,
  placement = 'bottom-left',
  style,
  testID,
}) => {
  const { colors, spacing, radii, typography, shadows } = useTheme();
  const triggerRef = useRef<View>(null);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });

  const handleOpen = useCallback(() => {
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setMenuPos({ x, y: y + height + 4 });
    });
  }, []);

  React.useEffect(() => {
    if (visible) handleOpen();
  }, [visible, handleOpen]);

  return (
    <View testID={testID} style={style}>
      <View ref={triggerRef} collapsable={false}>
        {trigger}
      </View>
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onClose}
      >
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={onClose}
        />
        <View
          style={[
            styles.menu,
            {
              top: menuPos.y,
              left: menuPos.x,
              backgroundColor: colors.surfaceElevated ?? '#2A2A2A',
              borderRadius: radii.md ?? 12,
              borderColor: colors.border ?? '#333',
              borderWidth: 1,
              ...(shadows.md ?? {}),
            },
          ]}
        >
          {items.map((item, index) => (
            <Pressable
              key={`${item.label}-${index}`}
              onPress={() => {
                if (!item.disabled) item.onPress();
              }}
              accessibilityRole="menuitem"
              accessibilityLabel={item.label}
              accessibilityState={{ disabled: item.disabled ?? false }}
              style={({ pressed }) => [
                styles.menuItem,
                {
                  paddingHorizontal: spacing.md ?? 16,
                  paddingVertical: 12,
                  opacity: item.disabled ? 0.4 : pressed ? 0.7 : 1,
                  backgroundColor: pressed && !item.disabled
                    ? (colors.surface ?? '#1C1C1E')
                    : 'transparent',
                },
                index < items.length - 1 && {
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  borderBottomColor: colors.border ?? '#333',
                },
              ]}
            >
              {item.icon && (
                <View style={{ marginRight: spacing.sm ?? 8 }}>
                  {item.icon}
                </View>
              )}
              <Text
                style={{
                  ...(typography.body ?? { fontSize: 15 }),
                  color: item.destructive
                    ? (colors.error ?? '#FF453A')
                    : (colors.text ?? '#FFFFFF'),
                }}
                numberOfLines={1}
              >
                {item.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    minWidth: 200,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
