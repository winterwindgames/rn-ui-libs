import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { ScrollBox } from './ScrollBox';
import { TestWrapper } from '../../test-utils';

describe('ScrollBox', () => {
  it('renders children', () => {
    const { getByText } = render(
      <TestWrapper><ScrollBox><Text>Scrollable</Text></ScrollBox></TestWrapper>
    );
    expect(getByText('Scrollable')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><ScrollBox testID="sb"><Text>C</Text></ScrollBox></TestWrapper>
    );
    expect(getByTestId('sb')).toBeTruthy();
  });

  it('renders horizontal', () => {
    const { getByTestId } = render(
      <TestWrapper><ScrollBox horizontal testID="sbh"><Text>C</Text></ScrollBox></TestWrapper>
    );
    expect(getByTestId('sbh')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><ScrollBox testID="sbl"><Text>C</Text></ScrollBox></TestWrapper>
    );
    expect(getByTestId('sbl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><ScrollBox testID="sbd"><Text>C</Text></ScrollBox></TestWrapper>
    );
    expect(getByTestId('sbd')).toBeTruthy();
  });
});
