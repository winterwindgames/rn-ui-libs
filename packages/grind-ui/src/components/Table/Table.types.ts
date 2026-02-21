import { ViewStyle, StyleProp } from 'react-native';

export interface TableColumn {
  key: string;
  title: string;
  width?: number;
  align?: 'left' | 'center' | 'right';
}

export interface TableProps {
  columns: TableColumn[];
  data: Record<string, any>[];
  striped?: boolean;
  hoverable?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
