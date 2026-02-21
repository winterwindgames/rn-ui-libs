import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { EmptyState } from './EmptyState';
import { TestWrapper } from '../../test-utils';

describe('EmptyState', () => {
  it('renders title', () => {
    const { getByText } = render(
      <TestWrapper><EmptyState title="No results" /></TestWrapper>
    );
    expect(getByText('No results')).toBeTruthy();
  });

  it('renders subtitle', () => {
    const { getByText } = render(
      <TestWrapper><EmptyState title="Empty" subtitle="Try again" /></TestWrapper>
    );
    expect(getByText('Try again')).toBeTruthy();
  });

  it('calls onAction', () => {
    const onAction = jest.fn();
    const { getByText } = render(
      <TestWrapper><EmptyState title="E" actionLabel="Retry" onAction={onAction} /></TestWrapper>
    );
    fireEvent.press(getByText('Retry'));
    expect(onAction).toHaveBeenCalled();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><EmptyState title="E" testID="es" /></TestWrapper>
    );
    expect(getByTestId('es')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByText } = render(
      <TestWrapper scheme="light"><EmptyState title="L" /></TestWrapper>
    );
    expect(getByText('L')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByText } = render(
      <TestWrapper scheme="dark"><EmptyState title="D" /></TestWrapper>
    );
    expect(getByText('D')).toBeTruthy();
  });
});
