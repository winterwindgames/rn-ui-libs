import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { TabBar } from './TabBar';
import { TestWrapper } from '../../test-utils';

const items = [
  { key: 'home', label: 'Home', icon: () => <Text>🏠</Text> },
  { key: 'search', label: 'Search', icon: () => <Text>🔍</Text> },
];

describe('TabBar', () => {
  const onTabPress = jest.fn();

  it('renders with default props', () => {
    const { getByText } = render(
      <TestWrapper><TabBar items={items} activeKey="home" onTabPress={onTabPress} /></TestWrapper>
    );
    expect(getByText('Home')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><TabBar items={items} activeKey="home" onTabPress={onTabPress} testID="tb" /></TestWrapper>
    );
    expect(getByTestId('tb')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><TabBar items={items} activeKey="home" onTabPress={onTabPress} /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><TabBar items={items} activeKey="home" onTabPress={onTabPress} /></TestWrapper>);
  });

  it('calls onTabPress', () => {
    const press = jest.fn();
    const { getByText } = render(
      <TestWrapper><TabBar items={items} activeKey="home" onTabPress={press} /></TestWrapper>
    );
    fireEvent.press(getByText('Search'));
    expect(press).toHaveBeenCalledWith('search');
  });
});
