import React from 'react';
import { render } from '@testing-library/react-native';
import { Skeleton } from './Skeleton';
import { TestWrapper } from '../../test-utils';

describe('Skeleton', () => {
  it('renders with default props', () => {
    const { getByTestId } = render(
      <TestWrapper><Skeleton testID="skel" /></TestWrapper>
    );
    expect(getByTestId('skel')).toBeTruthy();
  });

  it('renders all variants', () => {
    const variants = ['text', 'circular', 'rectangular'] as const;
    variants.forEach((variant) => {
      const { getByTestId } = render(
        <TestWrapper><Skeleton variant={variant} testID={`sk-${variant}`} /></TestWrapper>
      );
      expect(getByTestId(`sk-${variant}`)).toBeTruthy();
    });
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Skeleton testID="skeleton" /></TestWrapper>
    );
    expect(getByTestId('skeleton')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><Skeleton testID="skl" /></TestWrapper>
    );
    expect(getByTestId('skl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><Skeleton testID="skd" /></TestWrapper>
    );
    expect(getByTestId('skd')).toBeTruthy();
  });
});
