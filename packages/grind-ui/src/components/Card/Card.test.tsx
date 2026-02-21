import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Card } from './Card';
import { TestWrapper } from '../../test-utils';

describe('Card', () => {
  it('renders children', () => {
    const { getByText } = render(
      <TestWrapper><Card><Text>Content</Text></Card></TestWrapper>
    );
    expect(getByText('Content')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Card testID="card"><Text>C</Text></Card></TestWrapper>
    );
    expect(getByTestId('card')).toBeTruthy();
  });

  it('renders all variants', () => {
    const variants = ['elevated', 'outlined', 'filled'] as const;
    variants.forEach((variant) => {
      const { getByTestId } = render(
        <TestWrapper><Card variant={variant} testID={`c-${variant}`}><Text>C</Text></Card></TestWrapper>
      );
      expect(getByTestId(`c-${variant}`)).toBeTruthy();
    });
  });

  it('calls onPress', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <TestWrapper><Card onPress={onPress}><Text>Pressable</Text></Card></TestWrapper>
    );
    fireEvent.press(getByText('Pressable'));
    expect(onPress).toHaveBeenCalled();
  });

  it('renders header and footer', () => {
    const { getByText } = render(
      <TestWrapper><Card header={<Text>Header</Text>} footer={<Text>Footer</Text>}><Text>Body</Text></Card></TestWrapper>
    );
    expect(getByText('Header')).toBeTruthy();
    expect(getByText('Footer')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><Card testID="cl"><Text>C</Text></Card></TestWrapper>
    );
    expect(getByTestId('cl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><Card testID="cd"><Text>C</Text></Card></TestWrapper>
    );
    expect(getByTestId('cd')).toBeTruthy();
  });
});
