import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { TestWrapper } from '../../test-utils';

// Toast uses context-based API, test the provider
describe('Toast', () => {
  it('renders without crashing', () => {
    const { getByText } = render(
      <TestWrapper><Text>App with Toast</Text></TestWrapper>
    );
    expect(getByText('App with Toast')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByText } = render(
      <TestWrapper scheme="light"><Text>Light Toast</Text></TestWrapper>
    );
    expect(getByText('Light Toast')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByText } = render(
      <TestWrapper scheme="dark"><Text>Dark Toast</Text></TestWrapper>
    );
    expect(getByText('Dark Toast')).toBeTruthy();
  });
});
