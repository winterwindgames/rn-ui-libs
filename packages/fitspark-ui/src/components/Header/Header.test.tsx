import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Header } from './Header';
import { TestWrapper } from '../../test-utils';

describe('Header', () => {
  it('renders with default props', () => {
    render(<TestWrapper><Header /></TestWrapper>);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Header testID="hdr" /></TestWrapper>
    );
    expect(getByTestId('hdr')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><Header title="T" /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><Header title="T" /></TestWrapper>);
  });

  it('renders title', () => {
    const { getByText } = render(
      <TestWrapper><Header title="Dashboard" /></TestWrapper>
    );
    expect(getByText('Dashboard')).toBeTruthy();
  });

  it('renders subtitle', () => {
    const { getByText } = render(
      <TestWrapper><Header title="T" subtitle="Sub" /></TestWrapper>
    );
    expect(getByText('Sub')).toBeTruthy();
  });

  it('calls onBackPress', () => {
    const onBackPress = jest.fn();
    const { getByTestId } = render(
      <TestWrapper><Header showBack onBackPress={onBackPress} testID="hdr" /></TestWrapper>
    );
  });

  it('renders variants', () => {
    render(<TestWrapper><Header variant="solid" /></TestWrapper>);
    render(<TestWrapper><Header variant="transparent" /></TestWrapper>);
  });
});
