import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Container } from './Container';
import { TestWrapper } from '../../test-utils';

describe('Container', () => {
  it('renders children', () => {
    const { getByText } = render(
      <TestWrapper><Container><Text>Content</Text></Container></TestWrapper>
    );
    expect(getByText('Content')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Container testID="cont"><Text>C</Text></Container></TestWrapper>
    );
    expect(getByTestId('cont')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><Container testID="cl"><Text>C</Text></Container></TestWrapper>
    );
    expect(getByTestId('cl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><Container testID="cd"><Text>C</Text></Container></TestWrapper>
    );
    expect(getByTestId('cd')).toBeTruthy();
  });

  it('applies style override', () => {
    const { getByTestId } = render(
      <TestWrapper><Container testID="styled" style={{ marginTop: 50 }}><Text>C</Text></Container></TestWrapper>
    );
    expect(getByTestId('styled')).toBeTruthy();
  });
});
