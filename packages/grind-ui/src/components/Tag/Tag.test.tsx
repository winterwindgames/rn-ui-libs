import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Tag } from './Tag';
import { TestWrapper } from '../../test-utils';

describe('Tag', () => {
  it('renders label', () => {
    const { getByText } = render(
      <TestWrapper><Tag label="React" /></TestWrapper>
    );
    expect(getByText('React')).toBeTruthy();
  });

  it('renders all variants', () => {
    const variants = ['solid', 'outline', 'subtle'] as const;
    variants.forEach((variant) => {
      const { getByText } = render(
        <TestWrapper><Tag label={variant} variant={variant} /></TestWrapper>
      );
      expect(getByText(variant)).toBeTruthy();
    });
  });

  it('renders all sizes', () => {
    const sizes = ['sm', 'md'] as const;
    sizes.forEach((size) => {
      const { getByTestId } = render(
        <TestWrapper><Tag label="T" size={size} testID={`t-${size}`} /></TestWrapper>
      );
      expect(getByTestId(`t-${size}`)).toBeTruthy();
    });
  });

  it('calls onRemove', () => {
    const onRemove = jest.fn();
    const { getByText } = render(
      <TestWrapper><Tag label="Remove" onRemove={onRemove} /></TestWrapper>
    );
    fireEvent.press(getByText('✕'));
    expect(onRemove).toHaveBeenCalled();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Tag label="T" testID="tag" /></TestWrapper>
    );
    expect(getByTestId('tag')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><Tag label="T" testID="tl" /></TestWrapper>
    );
    expect(getByTestId('tl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><Tag label="T" testID="td" /></TestWrapper>
    );
    expect(getByTestId('td')).toBeTruthy();
  });
});
