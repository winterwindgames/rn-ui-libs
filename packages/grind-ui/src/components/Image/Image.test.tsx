import React from 'react';
import { render } from '@testing-library/react-native';
import { Image } from './Image';
import { TestWrapper } from '../../test-utils';

describe('Image', () => {
  it('renders with source', () => {
    const { getByTestId } = render(
      <TestWrapper><Image source={{ uri: 'https://example.com/img.png' }} testID="img" /></TestWrapper>
    );
    expect(getByTestId('img')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Image source={{ uri: 'https://example.com/img.png' }} testID="image" /></TestWrapper>
    );
    expect(getByTestId('image')).toBeTruthy();
  });

  it('renders loading state', () => {
    const { getByTestId } = render(
      <TestWrapper><Image source={{ uri: 'https://example.com/img.png' }} loading testID="img-load" /></TestWrapper>
    );
    expect(getByTestId('img-load')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><Image source={{ uri: 'https://example.com/img.png' }} testID="il" /></TestWrapper>
    );
    expect(getByTestId('il')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><Image source={{ uri: 'https://example.com/img.png' }} testID="id" /></TestWrapper>
    );
    expect(getByTestId('id')).toBeTruthy();
  });
});
