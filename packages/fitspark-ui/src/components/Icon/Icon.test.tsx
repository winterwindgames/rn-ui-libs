import React from 'react';
import { render } from '@testing-library/react-native';
import { Icon } from './Icon';
import { TestWrapper } from '../../test-utils';

describe('Icon', () => {
  it('renders with default props', () => {
    render(<TestWrapper><Icon name="star" /></TestWrapper>);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Icon name="star" testID="icon" /></TestWrapper>
    );
    expect(getByTestId('icon')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><Icon name="star" /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><Icon name="star" /></TestWrapper>);
  });

  it('renders all sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
    sizes.forEach((size) => {
      render(<TestWrapper><Icon name="star" size={size} /></TestWrapper>);
    });
  });

  it('renders with numeric size', () => {
    render(<TestWrapper><Icon name="star" size={32} /></TestWrapper>);
  });

  it('renders with custom color', () => {
    render(<TestWrapper><Icon name="star" color="#FF0000" /></TestWrapper>);
  });

  it('renders with accessibilityLabel', () => {
    render(<TestWrapper><Icon name="star" accessibilityLabel="Favorite" /></TestWrapper>);
  });
});
