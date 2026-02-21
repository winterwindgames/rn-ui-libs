import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { FormGroup } from './FormGroup';
import { TestWrapper } from '../../test-utils';

describe('FormGroup', () => {
  it('renders with title', () => {
    const { getByText } = render(
      <TestWrapper><FormGroup title="Personal Info"><Text>Fields</Text></FormGroup></TestWrapper>
    );
    expect(getByText('Personal Info')).toBeTruthy();
  });

  it('renders subtitle', () => {
    const { getByText } = render(
      <TestWrapper><FormGroup title="T" subtitle="Sub"><Text>F</Text></FormGroup></TestWrapper>
    );
    expect(getByText('Sub')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><FormGroup title="T" testID="fg"><Text>F</Text></FormGroup></TestWrapper>
    );
    expect(getByTestId('fg')).toBeTruthy();
  });

  it('renders in light theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="light"><FormGroup title="T" testID="fgl"><Text>F</Text></FormGroup></TestWrapper>
    );
    expect(getByTestId('fgl')).toBeTruthy();
  });

  it('renders in dark theme', () => {
    const { getByTestId } = render(
      <TestWrapper scheme="dark"><FormGroup title="T" testID="fgd"><Text>F</Text></FormGroup></TestWrapper>
    );
    expect(getByTestId('fgd')).toBeTruthy();
  });
});
