import React from 'react';
import { render } from '@testing-library/react-native';
import { Divider } from './Divider';
import { TestWrapper } from '../../test-utils';

describe('Divider', () => {
  it('renders with default props', () => {
    render(<TestWrapper><Divider /></TestWrapper>);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Divider testID="div" /></TestWrapper>
    );
    expect(getByTestId('div')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><Divider /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><Divider /></TestWrapper>);
  });

  it('renders horizontal', () => {
    render(<TestWrapper><Divider orientation="horizontal" /></TestWrapper>);
  });

  it('renders vertical', () => {
    render(<TestWrapper><Divider orientation="vertical" /></TestWrapper>);
  });

  it('applies custom thickness', () => {
    render(<TestWrapper><Divider thickness={2} /></TestWrapper>);
  });
});
