import React from 'react';
import { render } from '@testing-library/react-native';
import { Slider } from './Slider';
import { TestWrapper } from '../../test-utils';

describe('Slider', () => {
  it('renders with value', () => {
    const { getByTestId } = render(
      <TestWrapper><Slider value={50} onValueChange={jest.fn()} testID="slider" /></TestWrapper>
    );
    expect(getByTestId('slider')).toBeTruthy();
  });

  it('renders with showValue', () => {
    const { getByText } = render(
      <TestWrapper><Slider value={75} onValueChange={jest.fn()} showValue /></TestWrapper>
    );
    expect(getByText('75')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Slider value={0} onValueChange={jest.fn()} testID="sl" /></TestWrapper>
    );
    expect(getByTestId('sl')).toBeTruthy();
  });

  it('handles disabled state', () => {
    const { getByTestId } = render(
      <TestWrapper><Slider value={50} onValueChange={jest.fn()} disabled testID="sl-dis" /></TestWrapper>
    );
    expect(getByTestId('sl-dis')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><Slider value={50} onValueChange={jest.fn()} testID="sll" /></TestWrapper>
    );
    expect(getByTestId('sll')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><Slider value={50} onValueChange={jest.fn()} testID="sld" /></TestWrapper>
    );
    expect(getByTestId('sld')).toBeTruthy();
  });
});
