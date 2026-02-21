import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { Avatar } from '../Avatar/Avatar';
import { AvatarGroupProps } from './AvatarGroup.types';

const SIZE_MAP = { sm: 32, md: 40, lg: 56, xl: 80 };

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  max = 4,
  size = 'md',
  style,
  testID,
}) => {
  const { colors } = useTheme();
  const dim = SIZE_MAP[size];
  const overlap = dim * 0.3;
  const visible = avatars.slice(0, max);
  const remaining = avatars.length - max;

  return (
    <View style={[styles.container, style]} testID={testID} accessibilityLabel={`Group of ${avatars.length} avatars`}>
      {visible.map((avatar, i) => (
        <View
          key={i}
          style={[
            styles.avatarWrapper,
            {
              marginLeft: i === 0 ? 0 : -overlap,
              zIndex: visible.length - i,
              borderRadius: dim / 2,
              borderColor: colors.background || '#0D0D0D',
              borderWidth: 2,
            },
          ]}
        >
          <Avatar {...avatar} size={size} />
        </View>
      ))}
      {remaining > 0 && (
        <View
          style={[
            styles.overflow,
            {
              width: dim,
              height: dim,
              borderRadius: dim / 2,
              backgroundColor: colors.surfaceSecondary || '#2A2A2A',
              marginLeft: -overlap,
              borderColor: colors.background || '#0D0D0D',
              borderWidth: 2,
            },
          ]}
        >
          <Text style={[styles.overflowText, { color: colors.text || '#FFFFFF', fontSize: dim * 0.3 }]}>
            +{remaining}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    overflow: 'hidden',
  },
  overflow: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  overflowText: {
    fontWeight: '700',
  },
});
