import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { Avatar } from '../Avatar/Avatar';
import type { AvatarGroupProps } from './AvatarGroup.types';

const SIZE_MAP = { xs: 24, sm: 32, md: 44, lg: 56, xl: 80 };

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars, max = 4, size = 'md', style, testID,
}) => {
  const { colors } = useTheme();
  const dim = SIZE_MAP[size] || 44;
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - max;

  return (
    <View testID={testID} style={[{ flexDirection: 'row' }, style]}>
      {visible.map((a, i) => (
        <View key={i} style={{ marginLeft: i > 0 ? -dim * 0.25 : 0, zIndex: max - i }}>
          <Avatar {...a} size={size} />
        </View>
      ))}
      {overflow > 0 && (
        <View style={{ width: dim, height: dim, borderRadius: dim / 2, backgroundColor: colors.surfaceElevated, marginLeft: -dim * 0.25, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: colors.background }}>
          <Text style={{ color: colors.textSecondary, fontWeight: '600', fontSize: dim * 0.3 }}>+{overflow}</Text>
        </View>
      )}
    </View>
  );
};
