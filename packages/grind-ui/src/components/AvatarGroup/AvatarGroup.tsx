import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/useTheme';
import { Avatar } from '../Avatar/Avatar';
import { AvatarGroupProps } from './AvatarGroup.types';
import { AvatarSize } from '../Avatar/Avatar.types';

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  max = 4,
  size = 'md',
  spacing: overlapSpacing,
  style,
  testID,
}) => {
  const { sizes, colors } = useTheme();

  const sizeMap: Record<AvatarSize, number> = {
    sm: sizes.avatarSm ?? 28,
    md: sizes.avatarMd ?? 40,
    lg: sizes.avatarLg ?? 56,
    xl: sizes.avatarXl ?? 80,
  };

  const dim = sizeMap[size];
  const overlap = overlapSpacing ?? dim * 0.3;
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - max;

  return (
    <View
      style={[styles.container, style]}
      testID={testID}
      accessibilityRole="none"
      accessibilityLabel={`Group of ${avatars.length} avatars`}
    >
      {visible.map((avatar, index) => (
        <View
          key={index}
          style={[
            styles.avatarWrapper,
            {
              marginLeft: index === 0 ? 0 : -overlap,
              zIndex: visible.length - index,
              borderRadius: dim / 2,
              borderWidth: 2,
              borderColor: colors.background,
            },
          ]}
        >
          <Avatar source={avatar.source} name={avatar.name} size={size} />
        </View>
      ))}
      {overflow > 0 && (
        <View
          style={[
            styles.overflow,
            {
              width: dim,
              height: dim,
              borderRadius: dim / 2,
              marginLeft: -overlap,
              backgroundColor: colors.surfaceElevated,
              borderWidth: 2,
              borderColor: colors.background,
            },
          ]}
        >
          <Text
            style={[
              styles.overflowText,
              { fontSize: dim * 0.32, color: colors.textSecondary },
            ]}
          >
            +{overflow}
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
