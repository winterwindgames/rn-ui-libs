import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Header } from './Header';
import { TestWrapper } from '../../test-utils';

describe('Header', () => {
  it('renders title', () => {
    const { getByText } = render(
      <TestWrapper><Header title="Dashboard" /></TestWrapper>
    );
    expect(getByText('Dashboard')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Header title="T" testID="header" /></TestWrapper>
    );
    expect(getByTestId('header')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByText } = render(
      <TestWrapper scheme="light"><Header title="Light" /></TestWrapper>
    );
    expect(getByText('Light')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByText } = render(
      <TestWrapper scheme="dark"><Header title="Dark" /></TestWrapper>
    );
    expect(getByText('Dark')).toBeTruthy();
  });
});
