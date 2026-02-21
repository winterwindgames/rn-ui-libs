import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { StickyHeader } from './StickyHeader';
import { TestWrapper } from '../../test-utils';

describe('StickyHeader', () => {
  it('renders with default props', () => {
    const { getByText } = render(
      <TestWrapper>
        <StickyHeader header={<Text>Header</Text>}>
          <Text>Content</Text>
        </StickyHeader>
      </TestWrapper>
    );
    expect(getByText('Header')).toBeTruthy();
    expect(getByText('Content')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper>
        <StickyHeader header={<Text>H</Text>} testID="sh"><Text>C</Text></StickyHeader>
      </TestWrapper>
    );
    expect(getByTestId('sh')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><StickyHeader header={<Text>H</Text>}><Text>C</Text></StickyHeader></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><StickyHeader header={<Text>H</Text>}><Text>C</Text></StickyHeader></TestWrapper>);
  });
});
