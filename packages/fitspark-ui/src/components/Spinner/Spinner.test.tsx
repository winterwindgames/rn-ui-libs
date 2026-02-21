import React from 'react';
import { render } from '@testing-library/react-native';
import { Spinner } from './Spinner';
import { TestWrapper } from '../../test-utils';

describe('Spinner', () => {
  it('renders with default props', () => {
    render(<TestWrapper><Spinner /></TestWrapper>);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Spinner testID="spin" /></TestWrapper>
    );
    expect(getByTestId('spin')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><Spinner /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><Spinner /></TestWrapper>);
  });

  it('renders all sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach((size) => {
      render(<TestWrapper><Spinner size={size} /></TestWrapper>);
    });
  });

  it('renders with custom color', () => {
    render(<TestWrapper><Spinner color="#FF0000" /></TestWrapper>);
  });
});
