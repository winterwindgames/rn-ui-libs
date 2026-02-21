import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Link } from './Link';
import { TestWrapper } from '../../test-utils';

describe('Link', () => {
  it('renders children', () => {
    const { getByText } = render(
      <TestWrapper><Link href="https://example.com">Click me</Link></TestWrapper>
    );
    expect(getByText('Click me')).toBeTruthy();
  });

  it('calls onPress', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <TestWrapper><Link onPress={onPress}>Press</Link></TestWrapper>
    );
    fireEvent.press(getByText('Press'));
    expect(onPress).toHaveBeenCalled();
  });

  it('renders disabled state', () => {
    const { getByTestId } = render(
      <TestWrapper><Link onPress={jest.fn()} disabled testID="link-dis">Disabled</Link></TestWrapper>
    );
    expect(getByTestId('link-dis')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Link href="#" testID="link">L</Link></TestWrapper>
    );
    expect(getByTestId('link')).toBeTruthy();
  });

  it('renders all sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach((size) => {
      const { getByTestId } = render(
        <TestWrapper><Link href="#" size={size} testID={`l-${size}`}>L</Link></TestWrapper>
      );
      expect(getByTestId(`l-${size}`)).toBeTruthy();
    });
  });

  it('renders in light theme', () => {
    const { getByText } = render(
      <TestWrapper scheme="light"><Link href="#">Light</Link></TestWrapper>
    );
    expect(getByText('Light')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByText } = render(
      <TestWrapper scheme="dark"><Link href="#">Dark</Link></TestWrapper>
    );
    expect(getByText('Dark')).toBeTruthy();
  });
});
