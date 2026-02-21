import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Tabs } from './Tabs';
import { TestWrapper } from '../../test-utils';

const tabs = [
  { label: 'Tab 1', content: <Text>Content 1</Text> },
  { label: 'Tab 2', content: <Text>Content 2</Text> },
];

describe('Tabs', () => {
  it('renders with default props', () => {
    const { getByText } = render(
      <TestWrapper><Tabs tabs={tabs} /></TestWrapper>
    );
    expect(getByText('Tab 1')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Tabs tabs={tabs} testID="tabs" /></TestWrapper>
    );
    expect(getByTestId('tabs')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><Tabs tabs={tabs} /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><Tabs tabs={tabs} /></TestWrapper>);
  });

  it('renders all variants', () => {
    const variants = ['underline', 'filled', 'pill'] as const;
    variants.forEach((variant) => {
      render(<TestWrapper><Tabs tabs={tabs} variant={variant} /></TestWrapper>);
    });
  });

  it('calls onTabChange', () => {
    const onTabChange = jest.fn();
    const { getByText } = render(
      <TestWrapper><Tabs tabs={tabs} onTabChange={onTabChange} /></TestWrapper>
    );
    fireEvent.press(getByText('Tab 2'));
    expect(onTabChange).toHaveBeenCalledWith(1);
  });

  it('renders active content', () => {
    const { getByText } = render(
      <TestWrapper><Tabs tabs={tabs} activeIndex={0} /></TestWrapper>
    );
    expect(getByText('Content 1')).toBeTruthy();
  });
});
