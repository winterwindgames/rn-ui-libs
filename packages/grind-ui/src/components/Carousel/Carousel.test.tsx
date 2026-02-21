import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Carousel } from './Carousel';
import { TestWrapper } from '../../test-utils';

describe('Carousel', () => {
  const data = ['A', 'B', 'C'];
  const renderItem = (item: string) => <Text key={item}>{item}</Text>;

  it('renders with data', () => {
    const { getByText } = render(
      <TestWrapper><Carousel data={data} renderItem={renderItem} itemWidth={200} /></TestWrapper>
    );
    expect(getByText('A')).toBeTruthy();
    expect(getByText('B')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Carousel data={data} renderItem={renderItem} itemWidth={200} testID="carousel" /></TestWrapper>
    );
    expect(getByTestId('carousel')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><Carousel data={data} renderItem={renderItem} itemWidth={200} testID="cl" /></TestWrapper>
    );
    expect(getByTestId('cl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><Carousel data={data} renderItem={renderItem} itemWidth={200} testID="cd" /></TestWrapper>
    );
    expect(getByTestId('cd')).toBeTruthy();
  });
});
