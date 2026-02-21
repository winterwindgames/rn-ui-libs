import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { Text } from '../Text';
import type { DatePickerProps } from './DatePicker.types';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const defaultFormat = (d: Date) => `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  minimumDate,
  maximumDate,
  label,
  placeholder = 'Select date',
  error,
  disabled = false,
  format = defaultFormat,
  style,
  testID,
}) => {
  const { theme } = useTheme();
  const { colors, spacing, radii, sizes } = theme;
  const [open, setOpen] = useState(false);
  const [tempDate, setTempDate] = useState(value ?? new Date());

  const years = useMemo(() => {
    const minY = minimumDate?.getFullYear() ?? 1920;
    const maxY = maximumDate?.getFullYear() ?? 2100;
    return Array.from({ length: maxY - minY + 1 }, (_, i) => minY + i);
  }, [minimumDate, maximumDate]);

  const daysInMonth = new Date(tempDate.getFullYear(), tempDate.getMonth() + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const setMonth = useCallback((m: number) => {
    const d = new Date(tempDate);
    d.setMonth(m);
    const maxD = new Date(d.getFullYear(), m + 1, 0).getDate();
    if (d.getDate() > maxD) d.setDate(maxD);
    setTempDate(d);
  }, [tempDate]);

  const setDay = useCallback((day: number) => {
    const d = new Date(tempDate);
    d.setDate(day);
    setTempDate(d);
  }, [tempDate]);

  const setYear = useCallback((y: number) => {
    const d = new Date(tempDate);
    d.setFullYear(y);
    const maxD = new Date(y, d.getMonth() + 1, 0).getDate();
    if (d.getDate() > maxD) d.setDate(maxD);
    setTempDate(d);
  }, [tempDate]);

  const confirm = useCallback(() => {
    onChange?.(tempDate);
    setOpen(false);
  }, [tempDate, onChange]);

  const triggerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: sizes.inputHeight.md,
    backgroundColor: colors.inputBackground,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: error ? colors.error : colors.border,
    paddingHorizontal: spacing.md,
    opacity: disabled ? 0.5 : 1,
  };

  const colStyle: ViewStyle = { flex: 1, maxHeight: 200 };
  const cellStyle = (active: boolean): ViewStyle => ({
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: active ? colors.primary : 'transparent',
    borderRadius: radii.sm,
    marginVertical: 1,
  });

  return (
    <View style={{ gap: spacing.xs }} testID={testID}>
      {label && <Text variant="label" color="textSecondary">{label}</Text>}
      <TouchableOpacity
        style={[triggerStyle, style]}
        onPress={() => !disabled && setOpen(true)}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={label ?? placeholder}
      >
        <Text variant="body" color={value ? 'text' : 'textMuted'}>
          {value ? format(value) : placeholder}
        </Text>
        <Text variant="body" color="textMuted">📅</Text>
      </TouchableOpacity>
      {error && <Text variant="caption" color="error">{error}</Text>}

      <Modal visible={open} transparent animationType="slide" onRequestClose={() => setOpen(false)}>
        <View style={{ flex: 1, backgroundColor: colors.overlay, justifyContent: 'flex-end' }}>
          <SafeAreaView style={{ backgroundColor: colors.surface, borderTopLeftRadius: radii.xl, borderTopRightRadius: radii.xl }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border }}>
              <TouchableOpacity onPress={() => setOpen(false)}><Text variant="body" color="textMuted">Cancel</Text></TouchableOpacity>
              <Text variant="h5">Date</Text>
              <TouchableOpacity onPress={confirm}><Text variant="body" color="primary">Done</Text></TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', padding: spacing.md, gap: spacing.sm }}>
              <ScrollView style={colStyle} showsVerticalScrollIndicator={false}>
                {MONTHS.map((m, i) => (
                  <TouchableOpacity key={m} onPress={() => setMonth(i)} style={cellStyle(tempDate.getMonth() === i)}>
                    <Text variant="body" color={tempDate.getMonth() === i ? 'textInverse' : 'text'} align="center">{m}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <ScrollView style={colStyle} showsVerticalScrollIndicator={false}>
                {days.map((d) => (
                  <TouchableOpacity key={d} onPress={() => setDay(d)} style={cellStyle(tempDate.getDate() === d)}>
                    <Text variant="body" color={tempDate.getDate() === d ? 'textInverse' : 'text'} align="center">{d}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <ScrollView style={colStyle} showsVerticalScrollIndicator={false}>
                {years.map((y) => (
                  <TouchableOpacity key={y} onPress={() => setYear(y)} style={cellStyle(tempDate.getFullYear() === y)}>
                    <Text variant="body" color={tempDate.getFullYear() === y ? 'textInverse' : 'text'} align="center">{y}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </SafeAreaView>
        </View>
      </Modal>
    </View>
  );
};
