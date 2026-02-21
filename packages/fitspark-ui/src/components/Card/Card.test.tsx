import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Card } from './Card';
import { TestWrapper } from '../../test-utils';

describe('Card', () => {
  it('renders with default props', () => {
    const { getByText } = render(
      <TestWrapper><Card><Text>Content</Text></Card></TestWrapper>
    );
    expect(getByText('Content')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Card testID="card" /></TestWrapper>
    );
    expect(getByTestId('card')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><Card /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><Card /></TestWrapper>);
  });

  it('renders all variants', () => {
    const variants = ['elevated', 'outlined', 'filled'] as const;
    variants.forEach((variant) => {
      render(<TestWrapper><Card variant={variant} /></TestWrapper>);
    });
  });

  it('renders header and footer', () => {
    const { getByText } = render(
      <TestWrapper>
        <Card header={<Text>Header</Text>} footer={<Text>Footer</Text>}>
          <Text>Body</Text>
        </Card>
      </TestWrapper>
    );
    expect(getByText('Header')).toBeTruthy();
    expect(getByText('Footer')).toBeTruthy();
  });

  it('handles onPress', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <TestWrapper><Card onPress={onPress} testID="c" /></TestWrapper>
    );
    fireEvent.press(getByTestId('c'));
    expect(onPress).toHaveBeenCalled();
  });

  it('respects disabled', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <TestWrapper><Card onPress={onPress} disabled testID="c" /></TestWrapper>
    );
    fireEvent.press(getByTestId('c'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
