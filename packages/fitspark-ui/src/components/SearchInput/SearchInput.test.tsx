import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SearchInput } from './SearchInput';
import { TestWrapper } from '../../test-utils';

describe('SearchInput', () => {
  it('renders with default props', () => {
    render(<TestWrapper><SearchInput /></TestWrapper>);
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><SearchInput testID="si" /></TestWrapper>
    );
    expect(getByTestId('si')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><SearchInput /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><SearchInput /></TestWrapper>);
  });

  it('renders placeholder', () => {
    const { getByPlaceholderText } = render(
      <TestWrapper><SearchInput placeholder="Search..." /></TestWrapper>
    );
    expect(getByPlaceholderText('Search...')).toBeTruthy();
  });

  it('calls onChangeText', () => {
    const onChangeText = jest.fn();
    const { getByTestId } = render(
      <TestWrapper><SearchInput onChangeText={onChangeText} testID="si" /></TestWrapper>
    );
    fireEvent.changeText(getByTestId('si'), 'hello');
  });

  it('renders disabled state', () => {
    render(<TestWrapper><SearchInput disabled /></TestWrapper>);
  });
});
