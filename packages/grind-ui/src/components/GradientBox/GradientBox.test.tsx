import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { GradientBox } from './GradientBox';
import { TestWrapper } from '../../test-utils';

describe('GradientBox', () => {
  it('renders with colors', () => {
    const { getByTestId } = render(
      <TestWrapper><GradientBox colors={['#000', '#fff']} testID="gb"><Text>C</Text></GradientBox></TestWrapper>
    );
    expect(getByTestId('gb')).toBeTruthy();
  });

  it('renders children', () => {
    const { getByText } = render(
      <TestWrapper><GradientBox colors={['#000', '#fff']}><Text>Content</Text></GradientBox></TestWrapper>
    );
    expect(getByText('Content')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><GradientBox colors={['#000', '#fff']} testID="gradient"><Text>C</Text></GradientBox></TestWrapper>
    );
    expect(getByTestId('gradient')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><GradientBox colors={['#000', '#fff']} testID="gbl"><Text>C</Text></GradientBox></TestWrapper>
    );
    expect(getByTestId('gbl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><GradientBox colors={['#000', '#fff']} testID="gbd"><Text>C</Text></GradientBox></TestWrapper>
    );
    expect(getByTestId('gbd')).toBeTruthy();
  });
});
