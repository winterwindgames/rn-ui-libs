import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { DatePickerProps } from './DatePicker.types';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();

const pad = (n: number) => n.toString().padStart(2, '0');

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  mode = 'date',
  minimumDate,
  maximumDate,
  label,
  style,
  testID,
}) => {
  const { colors, radii, typography, spacing } = useTheme();
  const [open, setOpen] = useState(false);

  const current = value ?? new Date();
  const [selectedYear, setSelectedYear] = useState(current.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(current.getMonth());
  const [selectedDay, setSelectedDay] = useState(current.getDate());
  const [selectedHour, setSelectedHour] = useState(current.getHours());
  const [selectedMinute, setSelectedMinute] = useState(current.getMinutes());
  const [viewMode, setViewMode] = useState<'year' | 'month' | 'day' | 'time'>('day');

  const showDate = mode === 'date' || mode === 'datetime';
  const showTime = mode === 'time' || mode === 'datetime';

  const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);

  const formatDisplay = (): string => {
    const parts: string[] = [];
    if (showDate && value) {
      parts.push(`${MONTHS[value.getMonth()].slice(0, 3)} ${value.getDate()}, ${value.getFullYear()}`);
    }
    if (showTime && value) {
      parts.push(`${pad(value.getHours())}:${pad(value.getMinutes())}`);
    }
    return parts.join(' ') || 'Select…';
  };

  const handleConfirm = useCallback(() => {
    const d = new Date(selectedYear, selectedMonth, selectedDay, selectedHour, selectedMinute);
    if (minimumDate && d < minimumDate) return;
    if (maximumDate && d > maximumDate) return;
    onChange?.(d);
    setOpen(false);
  }, [selectedYear, selectedMonth, selectedDay, selectedHour, selectedMinute, onChange, minimumDate, maximumDate]);

  const years = useMemo(() => {
    const minY = minimumDate?.getFullYear() ?? 1920;
    const maxY = maximumDate?.getFullYear() ?? 2100;
    const arr: number[] = [];
    for (let y = minY; y <= maxY; y++) arr.push(y);
    return arr;
  }, [minimumDate, maximumDate]);

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const primaryColor = colors.primary ?? '#787AF3';

  const renderPickerList = (
    data: (number | string)[],
    selectedVal: number | string,
    onPick: (v: any) => void,
    labelFn?: (v: any) => string,
  ) => (
    <FlatList
      data={data}
      keyExtractor={(item) => String(item)}
      style={styles.pickerList}
      renderItem={({ item }) => {
        const isSelected = item === selectedVal;
        return (
          <Pressable
            onPress={() => onPick(item)}
            style={[
              styles.pickerItem,
              { backgroundColor: isSelected ? primaryColor + '20' : 'transparent' },
            ]}
          >
            <Text
              style={[
                styles.pickerItemText,
                {
                  color: isSelected ? primaryColor : (colors.text ?? '#F8FBFC'),
                  fontWeight: isSelected ? '700' : '400',
                  fontFamily: typography.body.fontFamily ?? undefined,
                },
              ]}
            >
              {labelFn ? labelFn(item) : String(item)}
            </Text>
          </Pressable>
        );
      }}
      getItemLayout={(_, index) => ({ length: 44, offset: 44 * index, index })}
      initialScrollIndex={Math.max(0, data.indexOf(selectedVal) - 2)}
    />
  );

  return (
    <View style={[styles.container, style]} testID={testID}>
      {label && (
        <Text
          style={[
            styles.label,
            {
              color: colors.textSecondary ?? '#aaa',
              fontFamily: typography.body.fontFamily ?? undefined,
              marginBottom: spacing.xs ?? 4,
            },
          ]}
        >
          {label}
        </Text>
      )}

      <Pressable
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={label ?? 'Date picker'}
        style={[
          styles.trigger,
          {
            borderRadius: radii.md ?? 12,
            borderColor: colors.border ?? '#3a3a3a',
            backgroundColor: colors.surface ?? '#272727',
          },
        ]}
      >
        <Text
          style={[
            styles.triggerText,
            {
              color: value ? (colors.text ?? '#F8FBFC') : (colors.textSecondary ?? '#666'),
              fontFamily: typography.body.fontFamily ?? undefined,
            },
          ]}
        >
          {formatDisplay()}
        </Text>
      </Pressable>

      <Modal visible={open} transparent animationType="slide" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
          <SafeAreaView style={styles.sheetSafe}>
            <View
              style={[
                styles.sheet,
                {
                  backgroundColor: colors.surface ?? '#272727',
                  borderTopLeftRadius: radii.lg ?? 20,
                  borderTopRightRadius: radii.lg ?? 20,
                },
              ]}
              onStartShouldSetResponder={() => true}
            >
              <View style={styles.handle}>
                <View style={[styles.handleBar, { backgroundColor: colors.border ?? '#3a3a3a' }]} />
              </View>

              {/* Tab navigation */}
              <View style={styles.tabs}>
                {showDate && (
                  <>
                    <Pressable onPress={() => setViewMode('year')} style={styles.tab}>
                      <Text style={[styles.tabText, { color: viewMode === 'year' ? primaryColor : (colors.textSecondary ?? '#666') }]}>
                        {selectedYear}
                      </Text>
                    </Pressable>
                    <Pressable onPress={() => setViewMode('month')} style={styles.tab}>
                      <Text style={[styles.tabText, { color: viewMode === 'month' ? primaryColor : (colors.textSecondary ?? '#666') }]}>
                        {MONTHS[selectedMonth].slice(0, 3)}
                      </Text>
                    </Pressable>
                    <Pressable onPress={() => setViewMode('day')} style={styles.tab}>
                      <Text style={[styles.tabText, { color: viewMode === 'day' ? primaryColor : (colors.textSecondary ?? '#666') }]}>
                        {selectedDay}
                      </Text>
                    </Pressable>
                  </>
                )}
                {showTime && (
                  <Pressable onPress={() => setViewMode('time')} style={styles.tab}>
                    <Text style={[styles.tabText, { color: viewMode === 'time' ? primaryColor : (colors.textSecondary ?? '#666') }]}>
                      {pad(selectedHour)}:{pad(selectedMinute)}
                    </Text>
                  </Pressable>
                )}
              </View>

              {/* Picker body */}
              <View style={styles.pickerBody}>
                {viewMode === 'year' && renderPickerList(years, selectedYear, (y) => { setSelectedYear(y); setViewMode('month'); })}
                {viewMode === 'month' && renderPickerList(
                  Array.from({ length: 12 }, (_, i) => i),
                  selectedMonth,
                  (m) => { setSelectedMonth(m); setViewMode('day'); },
                  (m: number) => MONTHS[m],
                )}
                {viewMode === 'day' && renderPickerList(days, selectedDay, (d) => { setSelectedDay(d); if (showTime) setViewMode('time'); })}
                {viewMode === 'time' && (
                  <View style={styles.timeRow}>
                    <View style={styles.timeCol}>
                      <Text style={[styles.timeLabel, { color: colors.textSecondary ?? '#666' }]}>Hour</Text>
                      {renderPickerList(hours, selectedHour, setSelectedHour, (h: number) => pad(h))}
                    </View>
                    <View style={styles.timeCol}>
                      <Text style={[styles.timeLabel, { color: colors.textSecondary ?? '#666' }]}>Min</Text>
                      {renderPickerList(minutes, selectedMinute, setSelectedMinute, (m: number) => pad(m))}
                    </View>
                  </View>
                )}
              </View>

              {/* Confirm */}
              <Pressable
                onPress={handleConfirm}
                style={[styles.confirmBtn, { backgroundColor: primaryColor, borderRadius: 100 }]}
                accessibilityRole="button"
                accessibilityLabel="Confirm date"
              >
                <Text style={[styles.confirmText, { color: colors.textInverse ?? '#F8FBFC' }]}>
                  CONFIRM
                </Text>
              </Pressable>
            </View>
          </SafeAreaView>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%' },
  label: { fontSize: 13, fontWeight: '500' },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    paddingHorizontal: 16,
    borderWidth: 1.5,
  },
  triggerText: { fontSize: 15 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  sheetSafe: { maxHeight: '70%' },
  sheet: { paddingBottom: 20 },
  handle: { alignItems: 'center', paddingVertical: 12 },
  handleBar: { width: 40, height: 4, borderRadius: 2 },
  tabs: { flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 20, marginBottom: 8, gap: 16 },
  tab: { paddingVertical: 6, paddingHorizontal: 12 },
  tabText: { fontSize: 17, fontWeight: '700' },
  pickerBody: { height: 220 },
  pickerList: { flex: 1 },
  pickerItem: { height: 44, justifyContent: 'center', paddingHorizontal: 20 },
  pickerItemText: { fontSize: 16 },
  timeRow: { flexDirection: 'row', flex: 1 },
  timeCol: { flex: 1 },
  timeLabel: { fontSize: 12, textAlign: 'center', fontWeight: '600', marginBottom: 4 },
  confirmBtn: { marginHorizontal: 20, height: 48, alignItems: 'center', justifyContent: 'center', marginTop: 12 },
  confirmText: { fontSize: 15, fontWeight: '700', letterSpacing: 1.2 },
});
