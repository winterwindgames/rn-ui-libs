import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { PullToRefresh } from './PullToRefresh';
import { TestWrapper } from '../../test-utils';

describe('PullToRefresh', () => {
  it('renders children', () => {
    const { getByText } = render(
      <TestWrapper><PullToRefresh refreshing={false} onRefresh={jest.fn()}><Text>Content</Text></PullToRefresh></TestWrapper>
    );
    expect(getByText('Content')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><PullToRefresh refreshing={false} onRefresh={jest.fn()} testID="ptr"><Text>C</Text></PullToRefresh></TestWrapper>
    );
    expect(getByTestId('ptr')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><PullToRefresh refreshing={false} onRefresh={jest.fn()} testID="ptrl"><Text>C</Text></PullToRefresh></TestWrapper>
    );
    expect(getByTestId('ptrl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><PullToRefresh refreshing={false} onRefresh={jest.fn()} testID="ptrd"><Text>C</Text></PullToRefresh></TestWrapper>
    );
    expect(getByTestId('ptrd')).toBeTruthy();
  });
});
