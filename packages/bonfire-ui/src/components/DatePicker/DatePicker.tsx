import React, { useState } from 'react';
import { View, Text, Pressable, Modal, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { DatePickerProps } from './DatePicker.types';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export const DatePicker: React.FC<DatePickerProps> = ({
  value = new Date(), onChange, mode = 'date', style, testID,
}) => {
  const { colors, radii, typography, spacing } = useTheme();
  const [open, setOpen] = useState(false);
  const [tempDate, setTempDate] = useState(value);

  const formatDisplay = () => {
    if (mode === 'time') return `${value.getHours().toString().padStart(2,'0')}:${value.getMinutes().toString().padStart(2,'0')}`;
    return `${MONTHS[value.getMonth()]} ${value.getDate()}, ${value.getFullYear()}`;
  };

  return (
    <View testID={testID} style={style}>
      <Pressable onPress={() => setOpen(true)} accessibilityRole="button"
        style={[styles.trigger, { backgroundColor: colors.inputBackground, borderRadius: radii.md, borderWidth: 1.5, borderColor: colors.border, height: 44 }]}>
        <Text style={{ color: colors.text, fontSize: typography.body.fontSize }}>{formatDisplay()}</Text>
        <Text style={{ color: colors.textMuted }}>📅</Text>
      </Pressable>
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: colors.overlay }]} onPress={() => setOpen(false)} />
        <View style={[styles.modal, { backgroundColor: colors.surface, borderRadius: radii.xl, margin: spacing.lg, padding: spacing.lg }]}>
          <Text style={{ color: colors.text, ...typography.h5, marginBottom: spacing.md }}>Select Date</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: spacing.lg }}>
            {[tempDate.getMonth() > 0 ? '◀' : '', MONTHS[tempDate.getMonth()]+' '+tempDate.getFullYear(), tempDate.getMonth() < 11 ? '▶' : ''].map((t, i) => (
              <Pressable key={i} onPress={() => {
                if (i === 0 && tempDate.getMonth() > 0) setTempDate(new Date(tempDate.getFullYear(), tempDate.getMonth() - 1, tempDate.getDate()));
                if (i === 2 && tempDate.getMonth() < 11) setTempDate(new Date(tempDate.getFullYear(), tempDate.getMonth() + 1, tempDate.getDate()));
              }}>
                <Text style={{ color: colors.primary, fontSize: 16, fontWeight: '600' }}>{t}</Text>
              </Pressable>
            ))}
          </View>
          <Pressable onPress={() => { onChange?.(tempDate); setOpen(false); }}
            style={[styles.confirmBtn, { backgroundColor: colors.primary, borderRadius: radii.pill }]}>
            <Text style={{ color: colors.textInverse, fontWeight: '600' }}>Confirm</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  trigger: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 12 },
  modal: { position: 'absolute', top: '25%', left: 0, right: 0 },
  confirmBtn: { alignItems: 'center', paddingVertical: 14, marginTop: 8 },
});
