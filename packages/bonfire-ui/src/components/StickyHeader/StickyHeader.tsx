import React from 'react';
import { ScrollView, View } from 'react-native';
import type { StickyHeaderProps } from './StickyHeader.types';

export const StickyHeader: React.FC<StickyHeaderProps> = ({
  header, children, style, testID,
}) => {
  return (
    <ScrollView testID={testID} style={style} stickyHeaderIndices={[0]}>
      <View>{header}</View>
      {children}
    </ScrollView>
  );
};
