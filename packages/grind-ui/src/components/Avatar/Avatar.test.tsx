import React from 'react';
import { render } from '@testing-library/react-native';
import { Avatar } from './Avatar';
import { TestWrapper } from '../../test-utils';

describe('Avatar', () => {
  it('renders with name', () => {
    const { getByText } = render(
      <TestWrapper><Avatar name="John Doe" /></TestWrapper>
    );
    expect(getByText('JD')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Avatar name="Test" testID="avatar" /></TestWrapper>
    );
    expect(getByTestId('avatar')).toBeTruthy();
  });

  it('renders all sizes', () => {
    const sizes = ['sm', 'md', 'lg', 'xl'] as const;
    sizes.forEach((size) => {
      const { getByTestId } = render(
        <TestWrapper><Avatar name="AB" size={size} testID={`av-${size}`} /></TestWrapper>
      );
      expect(getByTestId(`av-${size}`)).toBeTruthy();
    });
  });

  it('renders in light theme', () => {
    const { getByText } = render(
      <TestWrapper scheme="light"><Avatar name="Light Test" /></TestWrapper>
    );
    expect(getByText('LT')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByText } = render(
      <TestWrapper scheme="dark"><Avatar name="Dark Test" /></TestWrapper>
    );
    expect(getByText('DT')).toBeTruthy();
  });

  it('renders with status color', () => {
    const { getByTestId } = render(
      <TestWrapper><Avatar name="Status" statusColor="green" testID="status-av" /></TestWrapper>
    );
    expect(getByTestId('status-av')).toBeTruthy();
  });
});
