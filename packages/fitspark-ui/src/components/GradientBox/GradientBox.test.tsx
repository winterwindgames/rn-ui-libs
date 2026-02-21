import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { GradientBox } from './GradientBox';
import { TestWrapper } from '../../test-utils';

describe('GradientBox', () => {
  it('renders with default props', () => {
    render(<TestWrapper><GradientBox><Text>Content</Text></GradientBox></TestWrapper>);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><GradientBox testID="gb" /></TestWrapper>
    );
    expect(getByTestId('gb')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><GradientBox /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><GradientBox /></TestWrapper>);
  });

  it('renders with custom colors', () => {
    render(<TestWrapper><GradientBox colors={['#FF0000', '#0000FF']} /></TestWrapper>);
  });
});
