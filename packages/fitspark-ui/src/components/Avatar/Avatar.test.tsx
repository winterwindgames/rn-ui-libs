import React from 'react';
import { render } from '@testing-library/react-native';
import { Avatar } from './Avatar';
import { TestWrapper } from '../../test-utils';

describe('Avatar', () => {
  it('renders with default props', () => {
    render(<TestWrapper><Avatar /></TestWrapper>);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Avatar testID="av" /></TestWrapper>
    );
    expect(getByTestId('av')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><Avatar name="John" /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><Avatar name="John" /></TestWrapper>);
  });

  it('renders all sizes', () => {
    const sizes = ['sm', 'md', 'lg', 'xl'] as const;
    sizes.forEach((size) => {
      render(<TestWrapper><Avatar size={size} name="A" /></TestWrapper>);
    });
  });

  it('renders with name initials', () => {
    const { getByText } = render(
      <TestWrapper><Avatar name="John Doe" /></TestWrapper>
    );
    expect(getByText('JD')).toBeTruthy();
  });

  it('renders with uri', () => {
    render(<TestWrapper><Avatar uri="https://example.com/img.jpg" /></TestWrapper>);
  });

  it('renders status variants', () => {
    const statuses = ['active', 'inactive', 'away', 'none'] as const;
    statuses.forEach((status) => {
      render(<TestWrapper><Avatar status={status} name="A" /></TestWrapper>);
    });
  });
});
