import React from 'react';
import { render } from '@testing-library/react-native';
import { View, Text } from 'react-native';
import { ConditionalWrap } from './ConditionalWrap';
import { TestWrapper } from '../../test-utils';

describe('ConditionalWrap', () => {
  it('wraps children when condition is true', () => {
    const { getByTestId } = render(
      <TestWrapper>
        <ConditionalWrap
          condition={true}
          wrap={(children) => <View testID="wrapper">{children}</View>}
        >
          <Text>Content</Text>
        </ConditionalWrap>
      </TestWrapper>
    );
    expect(getByTestId('wrapper')).toBeTruthy();
  });

  it('does not wrap children when condition is false', () => {
    const { queryByTestId, getByText } = render(
      <TestWrapper>
        <ConditionalWrap
          condition={false}
          wrap={(children) => <View testID="wrapper">{children}</View>}
        >
          <Text>Content</Text>
        </ConditionalWrap>
      </TestWrapper>
    );
    expect(queryByTestId('wrapper')).toBeNull();
    expect(getByText('Content')).toBeTruthy();
  });
});
