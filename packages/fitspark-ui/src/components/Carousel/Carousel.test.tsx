import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Carousel } from './Carousel';
import { TestWrapper } from '../../test-utils';

describe('Carousel', () => {
  const data = ['A', 'B', 'C'];
  const renderItem = (item: string) => <Text>{item}</Text>;

  it('renders with default props', () => {
    const { getByText } = render(
      <TestWrapper><Carousel data={data} renderItem={renderItem} /></TestWrapper>
    );
    expect(getByText('A')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Carousel data={data} renderItem={renderItem} testID="car" /></TestWrapper>
    );
    expect(getByTestId('car')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><Carousel data={data} renderItem={renderItem} /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><Carousel data={data} renderItem={renderItem} /></TestWrapper>);
  });

  it('renders with pagination', () => {
    render(<TestWrapper><Carousel data={data} renderItem={renderItem} showPagination /></TestWrapper>);
  });
});
