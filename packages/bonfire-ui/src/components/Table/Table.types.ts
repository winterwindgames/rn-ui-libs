import { ViewStyle } from 'react-native';

export interface TableColumn {
  key: string;
  title: string;
  width?: number;
  flex?: number;
}

export interface TableProps {
  columns: TableColumn[];
  data: Record<string, any>[];
  style?: ViewStyle;
  testID?: string;
}
