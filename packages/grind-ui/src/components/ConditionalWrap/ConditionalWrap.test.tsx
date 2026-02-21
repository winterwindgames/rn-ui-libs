import React from 'react';
import { render } from '@testing-library/react-native';
import { Text, View } from 'react-native';
import { ConditionalWrap } from './ConditionalWrap';
import { TestWrapper } from '../../test-utils';

describe('ConditionalWrap', () => {
  it('wraps children when condition is true', () => {
    const { getByTestId } = render(
      <TestWrapper>
        <ConditionalWrap condition={true} wrap={(c) => <View testID="wrapper">{c}</View>}>
          <Text>Child</Text>
        </ConditionalWrap>
      </TestWrapper>
    );
    expect(getByTestId('wrapper')).toBeTruthy();
  });

  it('does not wrap when condition is false', () => {
    const { queryByTestId, getByText } = render(
      <TestWrapper>
        <ConditionalWrap condition={false} wrap={(c) => <View testID="wrapper">{c}</View>}>
          <Text>Child</Text>
        </ConditionalWrap>
      </TestWrapper>
    );
    expect(queryByTestId('wrapper')).toBeNull();
    expect(getByText('Child')).toBeTruthy();
  });
});
