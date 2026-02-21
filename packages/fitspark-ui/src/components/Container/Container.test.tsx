import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Container } from './Container';
import { TestWrapper } from '../../test-utils';

describe('Container', () => {
  it('renders with default props', () => {
    const { getByText } = render(
      <TestWrapper><Container><Text>Content</Text></Container></TestWrapper>
    );
    expect(getByText('Content')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Container testID="cont" /></TestWrapper>
    );
    expect(getByTestId('cont')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><Container /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><Container /></TestWrapper>);
  });

  it('applies maxWidth', () => {
    render(<TestWrapper><Container maxWidth={600} /></TestWrapper>);
  });

  it('applies center', () => {
    render(<TestWrapper><Container center /></TestWrapper>);
  });
});
