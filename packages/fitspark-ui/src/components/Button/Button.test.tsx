import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from './Button';
import { TestWrapper } from '../../test-utils';

describe('Button', () => {
  it('renders with default props', () => {
    const { getByText } = render(
      <TestWrapper><Button>Press me</Button></TestWrapper>
    );
    expect(getByText('Press me')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Button testID="btn">T</Button></TestWrapper>
    );
    expect(getByTestId('btn')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><Button>L</Button></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><Button>D</Button></TestWrapper>);
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <TestWrapper><Button onPress={onPress}>Tap</Button></TestWrapper>
    );
    fireEvent.press(getByText('Tap'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <TestWrapper><Button onPress={onPress} disabled>Tap</Button></TestWrapper>
    );
    fireEvent.press(getByText('Tap'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('renders all variants', () => {
    const variants = ['solid', 'outline', 'ghost', 'link'] as const;
    variants.forEach((variant) => {
      const { getByText } = render(
        <TestWrapper><Button variant={variant}>{variant}</Button></TestWrapper>
      );
      expect(getByText(variant)).toBeTruthy();
    });
  });

  it('renders all sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach((size) => {
      render(<TestWrapper><Button size={size}>S</Button></TestWrapper>);
    });
  });

  it('renders loading state', () => {
    render(<TestWrapper><Button loading>Loading</Button></TestWrapper>);
  });

  it('renders fullWidth', () => {
    render(<TestWrapper><Button fullWidth>Full</Button></TestWrapper>);
  });
});
