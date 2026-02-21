import React from 'react';
import { render } from '@testing-library/react-native';
import { Stat } from './Stat';
import { TestWrapper } from '../../test-utils';

describe('Stat', () => {
  it('renders label and value', () => {
    const { getByText } = render(
      <TestWrapper><Stat label="Revenue" value="$1,200" /></TestWrapper>
    );
    expect(getByText('Revenue')).toBeTruthy();
    expect(getByText('$1,200')).toBeTruthy();
  });

  it('renders change', () => {
    const { getByTestId } = render(
      <TestWrapper><Stat label="Users" value="500" change={12} changeType="increase" testID="stat" /></TestWrapper>
    );
    expect(getByTestId('stat')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Stat label="L" value="V" testID="stat-id" /></TestWrapper>
    );
    expect(getByTestId('stat-id')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><Stat label="L" value="V" testID="stl" /></TestWrapper>
    );
    expect(getByTestId('stl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><Stat label="L" value="V" testID="std" /></TestWrapper>
    );
    expect(getByTestId('std')).toBeTruthy();
  });
});
