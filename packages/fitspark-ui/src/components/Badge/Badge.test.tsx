import React from 'react';
import { render } from '@testing-library/react-native';
import { View } from 'react-native';
import { Badge } from './Badge';
import { TestWrapper } from '../../test-utils';

describe('Badge', () => {
  it('renders with default props', () => {
    render(<TestWrapper><Badge label="New" /></TestWrapper>);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Badge label="X" testID="badge" /></TestWrapper>
    );
    expect(getByTestId('badge')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><Badge label="L" /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><Badge label="D" /></TestWrapper>);
  });

  it('renders all variants', () => {
    const variants = ['solid', 'outline', 'dot'] as const;
    variants.forEach((variant) => {
      render(<TestWrapper><Badge variant={variant} label="V" /></TestWrapper>);
    });
  });

  it('renders all colors', () => {
    const colors = ['accent', 'error', 'warning', 'info', 'default'] as const;
    colors.forEach((color) => {
      render(<TestWrapper><Badge color={color} label="C" /></TestWrapper>);
    });
  });

  it('renders with count', () => {
    render(<TestWrapper><Badge count={5} /></TestWrapper>);
  });

  it('renders with maxCount', () => {
    render(<TestWrapper><Badge count={100} maxCount={99} /></TestWrapper>);
  });

  it('renders children', () => {
    render(
      <TestWrapper><Badge count={3}><View /></Badge></TestWrapper>
    );
  });
});
