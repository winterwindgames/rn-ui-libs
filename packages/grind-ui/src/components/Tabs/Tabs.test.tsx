import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Tabs } from './Tabs';
import { TestWrapper } from '../../test-utils';

describe('Tabs', () => {
  const tabs = [
    { label: 'Tab 1', content: <Text>Content 1</Text> },
    { label: 'Tab 2', content: <Text>Content 2</Text> },
  ];

  it('renders tab labels', () => {
    const { getByText } = render(
      <TestWrapper><Tabs tabs={tabs} /></TestWrapper>
    );
    expect(getByText('Tab 1')).toBeTruthy();
    expect(getByText('Tab 2')).toBeTruthy();
  });

  it('renders active tab content', () => {
    const { getByText } = render(
      <TestWrapper><Tabs tabs={tabs} activeIndex={0} /></TestWrapper>
    );
    expect(getByText('Content 1')).toBeTruthy();
  });

  it('calls onTabChange', () => {
    const onTabChange = jest.fn();
    const { getByText } = render(
      <TestWrapper><Tabs tabs={tabs} onTabChange={onTabChange} /></TestWrapper>
    );
    fireEvent.press(getByText('Tab 2'));
    expect(onTabChange).toHaveBeenCalledWith(1);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Tabs tabs={tabs} testID="tabs" /></TestWrapper>
    );
    expect(getByTestId('tabs')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><Tabs tabs={tabs} testID="tl" /></TestWrapper>
    );
    expect(getByTestId('tl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><Tabs tabs={tabs} testID="td" /></TestWrapper>
    );
    expect(getByTestId('td')).toBeTruthy();
  });
});
