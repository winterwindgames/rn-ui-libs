import React from 'react';
import { render } from '@testing-library/react-native';
import { Icon } from './Icon';
import { TestWrapper } from '../../test-utils';

describe('Icon', () => {
  it('renders with default props', () => {
    const { getByTestId } = render(
      <TestWrapper><Icon name="home" testID="icon" /></TestWrapper>
    );
    expect(getByTestId('icon')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Icon name="star" testID="star-icon" /></TestWrapper>
    );
    expect(getByTestId('star-icon')).toBeTruthy();
  });

  it('renders all sizes', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach((size) => {
      const { getByTestId } = render(
        <TestWrapper><Icon name="home" size={size} testID={`i-${size}`} /></TestWrapper>
      );
      expect(getByTestId(`i-${size}`)).toBeTruthy();
    });
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><Icon name="home" testID="il" /></TestWrapper>
    );
    expect(getByTestId('il')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><Icon name="home" testID="id" /></TestWrapper>
    );
    expect(getByTestId('id')).toBeTruthy();
  });
});
