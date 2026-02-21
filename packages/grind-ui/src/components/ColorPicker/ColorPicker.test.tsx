import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ColorPicker } from './ColorPicker';
import { TestWrapper } from '../../test-utils';

describe('ColorPicker', () => {
  const colors = ['#FF0000', '#00FF00', '#0000FF'];

  it('renders swatches', () => {
    const { getByTestId } = render(
      <TestWrapper><ColorPicker colors={colors} value="#FF0000" onChange={jest.fn()} testID="cp" /></TestWrapper>
    );
    expect(getByTestId('cp')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><ColorPicker colors={colors} value="#FF0000" onChange={jest.fn()} testID="picker" /></TestWrapper>
    );
    expect(getByTestId('picker')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><ColorPicker colors={colors} value="#FF0000" onChange={jest.fn()} testID="cpl" /></TestWrapper>
    );
    expect(getByTestId('cpl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><ColorPicker colors={colors} value="#FF0000" onChange={jest.fn()} testID="cpd" /></TestWrapper>
    );
    expect(getByTestId('cpd')).toBeTruthy();
  });
});
