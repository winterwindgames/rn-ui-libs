import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { EmptyState } from './EmptyState';
import { TestWrapper } from '../../test-utils';

describe('EmptyState', () => {
  it('renders with default props', () => {
    const { getByText } = render(
      <TestWrapper><EmptyState title="No data" /></TestWrapper>
    );
    expect(getByText('No data')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><EmptyState title="T" testID="es" /></TestWrapper>
    );
    expect(getByTestId('es')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><EmptyState title="T" /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><EmptyState title="T" /></TestWrapper>);
  });

  it('renders subtitle', () => {
    const { getByText } = render(
      <TestWrapper><EmptyState title="T" subtitle="Try again" /></TestWrapper>
    );
    expect(getByText('Try again')).toBeTruthy();
  });

  it('renders action', () => {
    const { getByText } = render(
      <TestWrapper><EmptyState title="T" action={<Text>Retry</Text>} /></TestWrapper>
    );
    expect(getByText('Retry')).toBeTruthy();
  });
});
