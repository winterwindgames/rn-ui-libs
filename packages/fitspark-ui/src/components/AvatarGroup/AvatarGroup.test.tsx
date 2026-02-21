import React from 'react';
import { render } from '@testing-library/react-native';
import { AvatarGroup } from './AvatarGroup';
import { TestWrapper } from '../../test-utils';

const avatars = [
  { name: 'Alice' },
  { name: 'Bob' },
  { name: 'Charlie' },
  { name: 'Diana' },
];

describe('AvatarGroup', () => {
  it('renders with default props', () => {
    render(<TestWrapper><AvatarGroup avatars={avatars} /></TestWrapper>);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><AvatarGroup avatars={avatars} testID="ag" /></TestWrapper>
    );
    expect(getByTestId('ag')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><AvatarGroup avatars={avatars} /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><AvatarGroup avatars={avatars} /></TestWrapper>);
  });

  it('limits displayed avatars with max', () => {
    render(<TestWrapper><AvatarGroup avatars={avatars} max={2} /></TestWrapper>);
  });

  it('renders all sizes', () => {
    const sizes = ['sm', 'md', 'lg', 'xl'] as const;
    sizes.forEach((size) => {
      render(<TestWrapper><AvatarGroup avatars={avatars} size={size} /></TestWrapper>);
    });
  });
});
