import React from 'react';
import { render } from '@testing-library/react-native';
import { Image } from './Image';
import { TestWrapper } from '../../test-utils';

describe('Image', () => {
  it('renders with default props', () => {
    render(<TestWrapper><Image source={{ uri: 'https://example.com/img.jpg' }} /></TestWrapper>);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Image source={{ uri: 'https://example.com/img.jpg' }} testID="img" /></TestWrapper>
    );
    expect(getByTestId('img')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><Image source={{ uri: 'https://example.com/img.jpg' }} /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><Image source={{ uri: 'https://example.com/img.jpg' }} /></TestWrapper>);
  });

  it('renders with dimensions', () => {
    render(<TestWrapper><Image source={{ uri: 'https://example.com/img.jpg' }} width={100} height={100} /></TestWrapper>);
  });

  it('renders with borderRadius', () => {
    render(<TestWrapper><Image source={{ uri: 'https://example.com/img.jpg' }} borderRadius={8} /></TestWrapper>);
  });

  it('renders with accessibilityLabel', () => {
    render(<TestWrapper><Image source={{ uri: 'https://example.com/img.jpg' }} accessibilityLabel="Photo" /></TestWrapper>);
  });
});
