import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import type { AvatarProps, AvatarSize, AvatarStatus } from './Avatar.types';

const SIZE_MAP: Record<AvatarSize, number> = { xs: 24, sm: 32, md: 44, lg: 56, xl: 80 };
const STATUS_COLORS: Record<AvatarStatus, string> = { online: '#2ED573', offline: '#5C5C6B', busy: '#FF4757', away: '#FFA502' };

const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

export const Avatar: React.FC<AvatarProps> = ({
  source, uri, name = '', size = 'md', status, style, testID,
}) => {
  const { colors, radii } = useTheme();
  const dim = SIZE_MAP[size];
  const fontSize = dim * 0.38;
  const imgSource = source || (uri ? { uri } : undefined);

  return (
    <View testID={testID} style={[{ width: dim, height: dim, borderRadius: dim / 2, backgroundColor: colors.primary + '30', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }, style]}>
      {imgSource ? (
        <Image source={imgSource} style={{ width: dim, height: dim, borderRadius: dim / 2 }} />
      ) : (
        <Text style={{ color: colors.primary, fontSize, fontWeight: '700' }}>{getInitials(name)}</Text>
      )}
      {status && (
        <View style={[styles.status, { width: dim * 0.28, height: dim * 0.28, borderRadius: dim * 0.14, backgroundColor: STATUS_COLORS[status], borderWidth: 2, borderColor: colors.background, bottom: 0, right: 0 }]} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  status: { position: 'absolute' },
});
