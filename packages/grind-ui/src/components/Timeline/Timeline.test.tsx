import React from 'react';
import { render } from '@testing-library/react-native';
import { Timeline } from './Timeline';
import { TestWrapper } from '../../test-utils';

describe('Timeline', () => {
  const items = [
    { title: 'Created', description: 'Account created' },
    { title: 'Updated', description: 'Profile updated' },
  ];

  it('renders items', () => {
    const { getByText } = render(
      <TestWrapper><Timeline items={items} /></TestWrapper>
    );
    expect(getByText('Created')).toBeTruthy();
    expect(getByText('Updated')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Timeline items={items} testID="tl" /></TestWrapper>
    );
    expect(getByTestId('tl')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><Timeline items={items} testID="tll" /></TestWrapper>
    );
    expect(getByTestId('tll')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><Timeline items={items} testID="tld" /></TestWrapper>
    );
    expect(getByTestId('tld')).toBeTruthy();
  });
});
