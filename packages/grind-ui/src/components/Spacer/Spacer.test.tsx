import React from 'react';
import { render } from '@testing-library/react-native';
import { Spacer } from './Spacer';
import { TestWrapper } from '../../test-utils';

describe('Spacer', () => {
  it('renders with size', () => {
    const { getByTestId } = render(
      <TestWrapper><Spacer size={16} testID="spacer" /></TestWrapper>
    );
    expect(getByTestId('spacer')).toBeTruthy();
  });

  it('renders horizontal', () => {
    const { getByTestId } = render(
      <TestWrapper><Spacer size={8} horizontal testID="sh" /></TestWrapper>
    );
    expect(getByTestId('sh')).toBeTruthy();
  });

  it('renders with flex', () => {
    const { getByTestId } = render(
      <TestWrapper><Spacer flex={1} testID="sf" /></TestWrapper>
    );
    expect(getByTestId('sf')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Spacer size="md" testID="sp" /></TestWrapper>
    );
    expect(getByTestId('sp')).toBeTruthy();
  });
});
