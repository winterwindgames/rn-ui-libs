import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { ScrollBox } from './ScrollBox';
import { TestWrapper } from '../../test-utils';

describe('ScrollBox', () => {
  it('renders with default props', () => {
    render(<TestWrapper><ScrollBox><Text>Content</Text></ScrollBox></TestWrapper>);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><ScrollBox testID="sb" /></TestWrapper>
    );
    expect(getByTestId('sb')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><ScrollBox /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><ScrollBox /></TestWrapper>);
  });

  it('applies spacing props', () => {
    render(<TestWrapper><ScrollBox p="md" px="lg" /></TestWrapper>);
  });
});
