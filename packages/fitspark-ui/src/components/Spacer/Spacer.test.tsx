import React from 'react';
import { render } from '@testing-library/react-native';
import { Spacer } from './Spacer';
import { TestWrapper } from '../../test-utils';

describe('Spacer', () => {
  it('renders with default props', () => {
    render(<TestWrapper><Spacer /></TestWrapper>);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Spacer testID="spacer" /></TestWrapper>
    );
    expect(getByTestId('spacer')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><Spacer /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><Spacer /></TestWrapper>);
  });

  it('renders with size token', () => {
    render(<TestWrapper><Spacer size="lg" /></TestWrapper>);
  });

  it('renders with numeric size', () => {
    render(<TestWrapper><Spacer size={24} /></TestWrapper>);
  });

  it('renders horizontal', () => {
    render(<TestWrapper><Spacer horizontal /></TestWrapper>);
  });

  it('renders with flex', () => {
    render(<TestWrapper><Spacer flex={1} /></TestWrapper>);
  });
});
