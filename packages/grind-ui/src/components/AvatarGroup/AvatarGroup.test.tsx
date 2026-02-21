import React from 'react';
import { render } from '@testing-library/react-native';
import { AvatarGroup } from './AvatarGroup';
import { TestWrapper } from '../../test-utils';

const avatars = [
  { name: 'Alice' },
  { name: 'Bob' },
  { name: 'Charlie' },
  { name: 'Diana' },
  { name: 'Eve' },
];

describe('AvatarGroup', () => {
  it('renders with default props', () => {
    const { getByTestId } = render(
      <TestWrapper><AvatarGroup avatars={avatars} testID="ag" /></TestWrapper>
    );
    expect(getByTestId('ag')).toBeTruthy();
  });

  it('shows overflow count', () => {
    const { getByText } = render(
      <TestWrapper><AvatarGroup avatars={avatars} max={3} /></TestWrapper>
    );
    expect(getByText('+2')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><AvatarGroup avatars={avatars} testID="ag2" /></TestWrapper>
    );
    expect(getByTestId('ag2')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><AvatarGroup avatars={avatars} testID="ag-l" /></TestWrapper>
    );
    expect(getByTestId('ag-l')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><AvatarGroup avatars={avatars} testID="ag-d" /></TestWrapper>
    );
    expect(getByTestId('ag-d')).toBeTruthy();
  });

  it('renders all sizes', () => {
    const sizes = ['sm', 'md', 'lg', 'xl'] as const;
    sizes.forEach((size) => {
      const { getByTestId } = render(
        <TestWrapper><AvatarGroup avatars={avatars} size={size} testID={`ag-${size}`} /></TestWrapper>
      );
      expect(getByTestId(`ag-${size}`)).toBeTruthy();
    });
  });
});
