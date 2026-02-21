import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Tag } from './Tag';
import { TestWrapper } from '../../test-utils';

describe('Tag', () => {
  it('renders with default props', () => {
    const { getByText } = render(
      <TestWrapper><Tag label="React" /></TestWrapper>
    );
    expect(getByText('React')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Tag label="T" testID="tag" /></TestWrapper>
    );
    expect(getByTestId('tag')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><Tag label="T" /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><Tag label="T" /></TestWrapper>);
  });

  it('renders all variants', () => {
    const variants = ['solid', 'outline', 'subtle'] as const;
    variants.forEach((variant) => {
      render(<TestWrapper><Tag label="V" variant={variant} /></TestWrapper>);
    });
  });

  it('calls onPress', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <TestWrapper><Tag label="Tap" onPress={onPress} /></TestWrapper>
    );
    fireEvent.press(getByText('Tap'));
    expect(onPress).toHaveBeenCalled();
  });

  it('calls onRemove', () => {
    const onRemove = jest.fn();
    render(<TestWrapper><Tag label="T" removable onRemove={onRemove} /></TestWrapper>);
  });

  it('renders disabled state', () => {
    render(<TestWrapper><Tag label="T" disabled /></TestWrapper>);
  });
});
