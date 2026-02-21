import React from 'react';
import { render } from '@testing-library/react-native';
import { Slider } from './Slider';
import { TestWrapper } from '../../test-utils';

describe('Slider', () => {
  it('renders with default props', () => {
    render(<TestWrapper><Slider /></TestWrapper>);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Slider testID="slider" /></TestWrapper>
    );
    expect(getByTestId('slider')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><Slider /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><Slider /></TestWrapper>);
  });

  it('renders with value', () => {
    render(<TestWrapper><Slider value={50} min={0} max={100} /></TestWrapper>);
  });

  it('renders label', () => {
    const { getByText } = render(
      <TestWrapper><Slider label="Volume" /></TestWrapper>
    );
    expect(getByText('Volume')).toBeTruthy();
  });

  it('renders disabled state', () => {
    render(<TestWrapper><Slider disabled /></TestWrapper>);
  });

  it('renders with showValue', () => {
    render(<TestWrapper><Slider value={50} showValue /></TestWrapper>);
  });
});
