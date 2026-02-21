import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TabBar } from './TabBar';
import { TestWrapper } from '../../test-utils';

describe('TabBar', () => {
  const tabs = [{ label: 'Home' }, { label: 'Search' }, { label: 'Profile' }];

  it('renders tabs', () => {
    const { getByText } = render(
      <TestWrapper><TabBar tabs={tabs} activeIndex={0} onChange={jest.fn()} /></TestWrapper>
    );
    expect(getByText('Home')).toBeTruthy();
    expect(getByText('Search')).toBeTruthy();
  });

  it('calls onChange', () => {
    const onChange = jest.fn();
    const { getByText } = render(
      <TestWrapper><TabBar tabs={tabs} activeIndex={0} onChange={onChange} /></TestWrapper>
    );
    fireEvent.press(getByText('Search'));
    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><TabBar tabs={tabs} activeIndex={0} onChange={jest.fn()} testID="tabbar" /></TestWrapper>
    );
    expect(getByTestId('tabbar')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><TabBar tabs={tabs} activeIndex={0} onChange={jest.fn()} testID="tbl" /></TestWrapper>
    );
    expect(getByTestId('tbl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><TabBar tabs={tabs} activeIndex={0} onChange={jest.fn()} testID="tbd" /></TestWrapper>
    );
    expect(getByTestId('tbd')).toBeTruthy();
  });
});
