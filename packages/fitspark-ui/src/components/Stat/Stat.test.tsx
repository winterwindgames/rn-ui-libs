import React from 'react';
import { render } from '@testing-library/react-native';
import { Stat } from './Stat';
import { TestWrapper } from '../../test-utils';

describe('Stat', () => {
  it('renders with default props', () => {
    const { getByText } = render(
      <TestWrapper><Stat label="Users" value={1234} /></TestWrapper>
    );
    expect(getByText('Users')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Stat label="L" value="V" testID="stat" /></TestWrapper>
    );
    expect(getByTestId('stat')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><Stat label="L" value="V" /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><Stat label="L" value="V" /></TestWrapper>);
  });

  it('renders with change', () => {
    render(<TestWrapper><Stat label="L" value="V" change={12.5} changeLabel="vs last week" /></TestWrapper>);
  });
});
