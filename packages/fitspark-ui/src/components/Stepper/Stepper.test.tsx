import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Stepper } from './Stepper';
import { TestWrapper } from '../../test-utils';

describe('Stepper', () => {
  it('renders with default props', () => {
    render(<TestWrapper><Stepper /></TestWrapper>);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Stepper testID="stepper" /></TestWrapper>
    );
    expect(getByTestId('stepper')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><Stepper /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><Stepper /></TestWrapper>);
  });

  it('renders label', () => {
    const { getByText } = render(
      <TestWrapper><Stepper label="Quantity" /></TestWrapper>
    );
    expect(getByText('Quantity')).toBeTruthy();
  });

  it('renders all sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach((size) => {
      render(<TestWrapper><Stepper size={size} /></TestWrapper>);
    });
  });

  it('renders disabled state', () => {
    render(<TestWrapper><Stepper disabled /></TestWrapper>);
  });
});
