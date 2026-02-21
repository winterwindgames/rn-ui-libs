import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Stepper } from './Stepper';
import { TestWrapper } from '../../test-utils';

describe('Stepper', () => {
  it('renders value', () => {
    const { getByText } = render(
      <TestWrapper><Stepper value={5} onValueChange={jest.fn()} /></TestWrapper>
    );
    expect(getByText('5')).toBeTruthy();
  });

  it('increments on plus press', () => {
    const onValueChange = jest.fn();
    const { getByText } = render(
      <TestWrapper><Stepper value={5} onValueChange={onValueChange} /></TestWrapper>
    );
    fireEvent.press(getByText('+'));
    expect(onValueChange).toHaveBeenCalledWith(6);
  });

  it('decrements on minus press', () => {
    const onValueChange = jest.fn();
    const { getByText } = render(
      <TestWrapper><Stepper value={5} onValueChange={onValueChange} /></TestWrapper>
    );
    fireEvent.press(getByText('−'));
    expect(onValueChange).toHaveBeenCalledWith(4);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Stepper value={0} onValueChange={jest.fn()} testID="stepper" /></TestWrapper>
    );
    expect(getByTestId('stepper')).toBeTruthy();
  });

  it('renders all sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach((size) => {
      const { getByTestId } = render(
        <TestWrapper><Stepper value={0} onValueChange={jest.fn()} size={size} testID={`st-${size}`} /></TestWrapper>
      );
      expect(getByTestId(`st-${size}`)).toBeTruthy();
    });
  });

  it('renders disabled state', () => {
    const { getByTestId } = render(
      <TestWrapper><Stepper value={5} onValueChange={jest.fn()} disabled testID="st-dis" /></TestWrapper>
    );
    expect(getByTestId('st-dis')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><Stepper value={0} onValueChange={jest.fn()} testID="stl" /></TestWrapper>
    );
    expect(getByTestId('stl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><Stepper value={0} onValueChange={jest.fn()} testID="std" /></TestWrapper>
    );
    expect(getByTestId('std')).toBeTruthy();
  });
});
