import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Collapsible } from './Collapsible';
import { TestWrapper } from '../../test-utils';

describe('Collapsible', () => {
  it('renders with default props', () => {
    const { getByText } = render(
      <TestWrapper><Collapsible title="Section"><Text>Body</Text></Collapsible></TestWrapper>
    );
    expect(getByText('Section')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Collapsible title="T" testID="col"><Text>B</Text></Collapsible></TestWrapper>
    );
    expect(getByTestId('col')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><Collapsible title="T"><Text>B</Text></Collapsible></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><Collapsible title="T"><Text>B</Text></Collapsible></TestWrapper>);
  });

  it('toggles on press', () => {
    const onToggle = jest.fn();
    const { getByText } = render(
      <TestWrapper><Collapsible title="Toggle" onToggle={onToggle}><Text>B</Text></Collapsible></TestWrapper>
    );
    fireEvent.press(getByText('Toggle'));
    expect(onToggle).toHaveBeenCalled();
  });

  it('supports initiallyExpanded', () => {
    render(
      <TestWrapper><Collapsible title="T" initiallyExpanded><Text>B</Text></Collapsible></TestWrapper>
    );
  });
});
