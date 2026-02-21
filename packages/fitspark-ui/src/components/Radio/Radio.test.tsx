import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Radio } from './Radio';
import { TestWrapper } from '../../test-utils';

describe('Radio', () => {
  it('renders with default props', () => {
    render(<TestWrapper><Radio /></TestWrapper>);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Radio testID="radio" /></TestWrapper>
    );
    expect(getByTestId('radio')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><Radio /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><Radio /></TestWrapper>);
  });

  it('renders label', () => {
    const { getByText } = render(
      <TestWrapper><Radio label="Option A" /></TestWrapper>
    );
    expect(getByText('Option A')).toBeTruthy();
  });

  it('calls onPress', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <TestWrapper><Radio onPress={onPress} testID="r" /></TestWrapper>
    );
    fireEvent.press(getByTestId('r'));
    expect(onPress).toHaveBeenCalled();
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <TestWrapper><Radio onPress={onPress} disabled testID="r" /></TestWrapper>
    );
    fireEvent.press(getByTestId('r'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('renders selected state', () => {
    render(<TestWrapper><Radio selected /></TestWrapper>);
  });
});
