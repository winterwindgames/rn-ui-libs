import React, { useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { AvatarProps, AvatarSize, StatusPosition } from './Avatar.types';

const INITIALS_COLORS = ['#787AF3', '#E37461', '#C4CCC2', '#F2C94C', '#EB9784'];

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
};

const getColorFromName = (name: string): string => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return INITIALS_COLORS[Math.abs(hash) % INITIALS_COLORS.length];
};

export const Avatar: React.FC<AvatarProps> = ({
  source,
  name,
  size = 'md',
  statusColor,
  statusPosition = 'bottom-right',
  style,
  testID,
}) => {
  const { sizes, colors, typography } = useTheme();
  const [imgError, setImgError] = useState(false);

  const sizeMap: Record<AvatarSize, number> = {
    sm: sizes.avatarSm ?? 28,
    md: sizes.avatarMd ?? 40,
    lg: sizes.avatarLg ?? 56,
    xl: sizes.avatarXl ?? 80,
  };

  const dim = sizeMap[size];
  const fontSize = dim * 0.38;
  const statusDim = Math.max(dim * 0.28, 8);
  const showInitials = (!source || imgError) && name;

  const statusPositionStyle: Record<StatusPosition, any> = {
    'top-right': { top: 0, right: 0 },
    'bottom-right': { bottom: 0, right: 0 },
    'top-left': { top: 0, left: 0 },
    'bottom-left': { bottom: 0, left: 0 },
  };

  return (
    <View
      style={[
        styles.container,
        { width: dim, height: dim, borderRadius: dim / 2 },
        style,
      ]}
      testID={testID}
      accessibilityRole="image"
      accessibilityLabel={name ? `Avatar of ${name}` : 'Avatar'}
    >
      {source && !imgError ? (
        <Image
          source={source}
          style={[styles.image, { width: dim, height: dim, borderRadius: dim / 2 }]}
          onError={() => setImgError(true)}
        />
      ) : showInitials ? (
        <View
          style={[
            styles.initialsContainer,
            {
              width: dim,
              height: dim,
              borderRadius: dim / 2,
              backgroundColor: getColorFromName(name),
            },
          ]}
        >
          <Text style={[styles.initials, { fontSize, color: '#FFFFFF' }]}>
            {getInitials(name)}
          </Text>
        </View>
      ) : (
        <View
          style={[
            styles.initialsContainer,
            {
              width: dim,
              height: dim,
              borderRadius: dim / 2,
              backgroundColor: colors.surfaceElevated,
            },
          ]}
        />
      )}
      {statusColor && (
        <View
          style={[
            styles.status,
            statusPositionStyle[statusPosition],
            {
              width: statusDim,
              height: statusDim,
              borderRadius: statusDim / 2,
              backgroundColor: statusColor,
              borderColor: colors.background,
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    resizeMode: 'cover',
  },
  initialsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    fontWeight: '700',
  },
  status: {
    position: 'absolute',
    borderWidth: 2,
  },
});
