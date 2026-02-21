import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { AvatarProps, AvatarSize } from './Avatar.types';

const SIZE_MAP: Record<AvatarSize, number> = { sm: 32, md: 40, lg: 56, xl: 80 };
const FONT_MAP: Record<AvatarSize, number> = { sm: 12, md: 16, lg: 22, xl: 32 };
const DOT_MAP: Record<AvatarSize, number> = { sm: 8, md: 10, lg: 14, xl: 18 };

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
};

export const Avatar: React.FC<AvatarProps> = ({
  source,
  uri,
  name,
  size = 'md',
  status = 'none',
  style,
  testID,
}) => {
  const { colors } = useTheme();
  const [imgError, setImgError] = useState(false);
  const dim = SIZE_MAP[size];
  const imgSource = source || (uri ? { uri } : null);
  const showImage = imgSource && !imgError;

  const statusColors: Record<string, string> = {
    active: colors.accent || '#C8FF00',
    inactive: colors.textSecondary || '#8E8E93',
    away: '#FF9500',
  };

  return (
    <View
      style={[styles.container, { width: dim, height: dim, borderRadius: dim / 2 }, style]}
      testID={testID}
      accessibilityRole="image"
      accessibilityLabel={name ? `Avatar for ${name}` : 'Avatar'}
    >
      {showImage ? (
        <Image
          source={imgSource}
          style={[styles.image, { width: dim, height: dim, borderRadius: dim / 2 }]}
          onError={() => setImgError(true)}
        />
      ) : (
        <View
          style={[
            styles.fallback,
            {
              width: dim,
              height: dim,
              borderRadius: dim / 2,
              backgroundColor: colors.surfaceSecondary || '#2A2A2A',
            },
          ]}
        >
          <Text style={[styles.initials, { fontSize: FONT_MAP[size], color: colors.text || '#FFFFFF' }]}>
            {name ? getInitials(name) : '?'}
          </Text>
        </View>
      )}
      {status !== 'none' && (
        <View
          style={[
            styles.statusDot,
            {
              width: DOT_MAP[size],
              height: DOT_MAP[size],
              borderRadius: DOT_MAP[size] / 2,
              backgroundColor: statusColors[status] || '#8E8E93',
              borderColor: colors.background || '#0D0D0D',
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
  fallback: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    fontWeight: '700',
  },
  statusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 2,
  },
});
