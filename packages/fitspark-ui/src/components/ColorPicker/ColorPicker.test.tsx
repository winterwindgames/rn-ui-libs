import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ColorPicker } from './ColorPicker';
import { TestWrapper } from '../../test-utils';

describe('ColorPicker', () => {
  it('renders with default props', () => {
    render(<TestWrapper><ColorPicker /></TestWrapper>);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><ColorPicker testID="cp" /></TestWrapper>
    );
    expect(getByTestId('cp')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><ColorPicker /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><ColorPicker /></TestWrapper>);
  });

  it('renders custom colors', () => {
    render(<TestWrapper><ColorPicker colors={['#FF0000', '#00FF00', '#0000FF']} /></TestWrapper>);
  });

  it('renders label', () => {
    const { getByText } = render(
      <TestWrapper><ColorPicker label="Pick a color" /></TestWrapper>
    );
    expect(getByText('Pick a color')).toBeTruthy();
  });

  it('renders disabled state', () => {
    render(<TestWrapper><ColorPicker disabled /></TestWrapper>);
  });
});
