import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Drawer } from './Drawer';
import { TestWrapper } from '../../test-utils';

describe('Drawer', () => {
  const onClose = jest.fn();

  it('renders when visible', () => {
    const { getByText } = render(
      <TestWrapper><Drawer visible onClose={onClose}><Text>Content</Text></Drawer></TestWrapper>
    );
    expect(getByText('Content')).toBeTruthy();
  });

  it('forwards testID', () => {
    const { getByTestId } = render(
      <TestWrapper><Drawer visible onClose={onClose} testID="dr" /></TestWrapper>
    );
    expect(getByTestId('dr')).toBeTruthy();
  });

  it('renders in light theme', () => {
    render(<TestWrapper scheme="light"><Drawer visible onClose={onClose} /></TestWrapper>);
  });

  it('renders in dark theme', () => {
    render(<TestWrapper scheme="dark"><Drawer visible onClose={onClose} /></TestWrapper>);
  });

  it('does not render when not visible', () => {
    const { queryByText } = render(
      <TestWrapper><Drawer visible={false} onClose={onClose}><Text>Hidden</Text></Drawer></TestWrapper>
    );
    expect(queryByText('Hidden')).toBeNull();
  });

  it('renders from left side', () => {
    render(<TestWrapper><Drawer visible onClose={onClose} side="left" /></TestWrapper>);
  });

  it('renders from right side', () => {
    render(<TestWrapper><Drawer visible onClose={onClose} side="right" /></TestWrapper>);
  });

  it('renders header and footer', () => {
    const { getByText } = render(
      <TestWrapper>
        <Drawer visible onClose={onClose} header={<Text>H</Text>} footer={<Text>F</Text>} />
      </TestWrapper>
    );
    expect(getByText('H')).toBeTruthy();
    expect(getByText('F')).toBeTruthy();
  });
});
