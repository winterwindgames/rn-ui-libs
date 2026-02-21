import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { PullToRefresh } from './PullToRefresh';
import { TestWrapper } from '../../test-utils';

describe('PullToRefresh', () => {
  const onRefresh = jest.fn();

  it('renders with default props', () => {
    const { getByText } = render(
      <TestWrapper><PullToRefresh onRefresh={onRefresh}><Text>Content</Text></PullToRefresh></TestWrapper>
    );
    expect(getByText('Content')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><PullToRefresh onRefresh={onRefresh} testID="ptr"><Text>C</Text></PullToRefresh></TestWrapper>
    );
    expect(getByTestId('ptr')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><PullToRefresh onRefresh={onRefresh}><Text>C</Text></PullToRefresh></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><PullToRefresh onRefresh={onRefresh}><Text>C</Text></PullToRefresh></TestWrapper>);
  });

  it('renders refreshing state', () => {
    render(<TestWrapper><PullToRefresh onRefresh={onRefresh} refreshing><Text>C</Text></PullToRefresh></TestWrapper>);
  });
});
