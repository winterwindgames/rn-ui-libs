import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SearchInput } from './SearchInput';
import { TestWrapper } from '../../test-utils';

describe('SearchInput', () => {
  it('renders with placeholder', () => {
    const { getByPlaceholderText } = render(
      <TestWrapper><SearchInput placeholder="Search..." /></TestWrapper>
    );
    expect(getByPlaceholderText('Search...')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><SearchInput testID="search" /></TestWrapper>
    );
    expect(getByTestId('search')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><SearchInput testID="sl" /></TestWrapper>
    );
    expect(getByTestId('sl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><SearchInput testID="sd" /></TestWrapper>
    );
    expect(getByTestId('sd')).toBeTruthy();
  });

  it('renders loading state', () => {
    const { getByTestId } = render(
      <TestWrapper><SearchInput loading testID="sload" /></TestWrapper>
    );
    expect(getByTestId('sload')).toBeTruthy();
  });
});
