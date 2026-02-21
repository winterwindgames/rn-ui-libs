import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Collapsible } from './Collapsible';
import { TestWrapper } from '../../test-utils';

describe('Collapsible', () => {
  it('renders with title', () => {
    const { getByText } = render(
      <TestWrapper><Collapsible expanded={false} title="Section" onToggle={jest.fn()}><Text>Content</Text></Collapsible></TestWrapper>
    );
    expect(getByText('Section')).toBeTruthy();
  });

  it('calls onToggle when pressed', () => {
    const onToggle = jest.fn();
    const { getByText } = render(
      <TestWrapper><Collapsible expanded={false} title="Toggle" onToggle={onToggle}><Text>C</Text></Collapsible></TestWrapper>
    );
    fireEvent.press(getByText('Toggle'));
    expect(onToggle).toHaveBeenCalled();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Collapsible expanded title="T" onToggle={jest.fn()} testID="col"><Text>C</Text></Collapsible></TestWrapper>
    );
    expect(getByTestId('col')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByText } = render(
      <TestWrapper scheme="light"><Collapsible expanded title="L" onToggle={jest.fn()}><Text>C</Text></Collapsible></TestWrapper>
    );
    expect(getByText('L')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByText } = render(
      <TestWrapper scheme="dark"><Collapsible expanded title="D" onToggle={jest.fn()}><Text>C</Text></Collapsible></TestWrapper>
    );
    expect(getByText('D')).toBeTruthy();
  });
});
