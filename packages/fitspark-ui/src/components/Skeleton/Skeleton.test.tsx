import React from 'react';
import { render } from '@testing-library/react-native';
import { Skeleton } from './Skeleton';
import { TestWrapper } from '../../test-utils';

describe('Skeleton', () => {
  it('renders with default props', () => {
    render(<TestWrapper><Skeleton /></TestWrapper>);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Skeleton testID="sk" /></TestWrapper>
    );
    expect(getByTestId('sk')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><Skeleton /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><Skeleton /></TestWrapper>);
  });

  it('renders all variants', () => {
    const variants = ['rect', 'circle', 'text'] as const;
    variants.forEach((variant) => {
      render(<TestWrapper><Skeleton variant={variant} /></TestWrapper>);
    });
  });

  it('renders with custom dimensions', () => {
    render(<TestWrapper><Skeleton width={100} height={20} /></TestWrapper>);
  });
});
