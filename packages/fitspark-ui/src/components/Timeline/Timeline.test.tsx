import React from 'react';
import { render } from '@testing-library/react-native';
import { Timeline } from './Timeline';
import { TestWrapper } from '../../test-utils';

const items = [
  { id: '1', title: 'Started', description: 'Began workout', time: '9:00 AM' },
  { id: '2', title: 'Completed', description: 'Finished set', time: '9:30 AM' },
];

describe('Timeline', () => {
  it('renders with default props', () => {
    const { getByText } = render(
      <TestWrapper><Timeline items={items} /></TestWrapper>
    );
    expect(getByText('Started')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Timeline items={items} testID="tl" /></TestWrapper>
    );
    expect(getByTestId('tl')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><Timeline items={items} /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><Timeline items={items} /></TestWrapper>);
  });

  it('renders descriptions', () => {
    const { getByText } = render(
      <TestWrapper><Timeline items={items} /></TestWrapper>
    );
    expect(getByText('Began workout')).toBeTruthy();
  });
});
